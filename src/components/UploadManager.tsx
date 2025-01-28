import {
  UploadsDocument,
  UploadsQuery,
  UploadsQueryVariables,
  useCompleteMultipartUploadMutation,
} from "@/gql/graphql";
import { useStartMultipartUploadMutation } from "@/gql/graphql";
import { useGetPresignedUrlsMutation } from "@/gql/graphql";
import { useState, useCallback } from "react";
import prettyBytes from "pretty-bytes";
import { useApolloClient } from "@apollo/client";

const CHUNK_SIZE = 10 * 1024 * 1024;

export function UploadManager() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const [startUpload] = useStartMultipartUploadMutation();
  const [getPresignedUrls] = useGetPresignedUrlsMutation();
  const [completeUpload] = useCompleteMultipartUploadMutation({
    onCompleted(data) {
      const newUpload = data.completeMultipartUpload;
      // update the cache with the new upload
      const cache = client.cache;
      const existingUploads = cache.readQuery<
        UploadsQuery,
        UploadsQueryVariables
      >({ query: UploadsDocument });

      cache.writeQuery({
        query: UploadsDocument,
        data: {
          uploads: existingUploads?.uploads
            ? [newUpload, ...existingUploads.uploads]
            : [newUpload],
        },
      });
    },
  });

  const client = useApolloClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = useCallback(async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    try {
      // Step 1: Request uploadId & key
      const { data } = await startUpload({
        variables: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        },
      });

      if (!data)
        throw new Error(
          "Failed to start upload: no data from startMultipartUpload"
        );

      const { uploadId, key } = data.startMultipartUpload;
      const totalParts = Math.ceil(file.size / CHUNK_SIZE);

      if (!uploadId || !key)
        throw new Error("Failed to start upload: no uploadId or key");

      // Step 2: Get presigned URLs
      const { data: urlData } = await getPresignedUrls({
        variables: { uploadId, key, parts: totalParts },
      });

      if (!urlData)
        throw new Error(
          "Failed to get presigned URLs: no data from getPresignedUrls"
        );

      const presignedUrls: string[] = urlData.getPresignedUrls;
      const uploadedParts: { eTag: string; partNumber: number }[] = [];

      // Step 3: Upload chunks
      for (let i = 0; i < totalParts; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const response = await fetch(presignedUrls[i], {
          method: "PUT",
          body: chunk,
        });

        if (!response.ok) throw new Error(`Part ${i + 1} failed`);

        uploadedParts.push({
          eTag: response.headers.get("ETag") as string,
          partNumber: i + 1,
        });

        setProgress(Math.round(((i + 1) / totalParts) * 100));
      }

      // Step 4: Complete upload
      await completeUpload({
        variables: { uploadId, key, parts: uploadedParts },
      });

      alert("Upload complete!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [file, startUpload, getPresignedUrls, completeUpload]);

  return (
    <div className="w-96 rounded-lg border p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {file && (
        <p className="text-sm">
          {file.name} ({prettyBytes(file.size)})
        </p>
      )}
      <button
        className={`
          rounded bg-blue-500 px-4 py-2 text-white

          disabled:opacity-50
        `}
        onClick={uploadFile}
        disabled={!file || uploading}
      >
        {uploading ? `Uploading... ${progress}%` : "Upload"}
      </button>
      {uploading && (
        <div className="mt-2 h-2 w-full rounded bg-gray-300">
          <div
            className="h-2 rounded bg-green-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
