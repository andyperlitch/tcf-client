import {
  useCreateSubmissionPresignedUrlMutation,
  useCreateSubmissionMutation,
} from "@/gql/graphql";
import { uploadFile } from "@/utils/uploadFile";
import { useCallback, useState } from "react";

export function useCreateSubmission({
  engagementId,
  file,
  toData,
  onSuccess,
}: {
  engagementId: number;
  file?: File | null;
  toData: (url?: string) => any;
  onSuccess?: () => void;
}) {
  const [createPresignedUrl] = useCreateSubmissionPresignedUrlMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [succeeded, setSucceeded] = useState(false);
  const [createSubmission] = useCreateSubmissionMutation();

  const sendSubmission = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    setUploadProgress(0);
    setSucceeded(false);
    try {
      let photoUrl: string | undefined;

      if (file) {
        // retrieve a presigned upload URL
        const { data, errors } = await createPresignedUrl({
          variables: {
            engagementId,
            mimeType: file?.type,
          },
        });

        if (errors) {
          console.error(errors);
          setErrors(errors.map((e) => e.message));
          setLoading(false);
          return;
        }

        // proceed with upload, and report progress
        if (!data?.createSubmissionPresignedUrl) {
          setErrors(["No presigned URL returned"]);
          setLoading(false);
          return;
        }
        const { url, key } = data.createSubmissionPresignedUrl;
        await uploadFile({
          file,
          presignedUrl: url,
          onProgress: (progress) => setUploadProgress(progress),
        });
        photoUrl = key;
      }

      // once upload is complete, submit photo and caption to the backend
      await createSubmission({
        variables: {
          engagementId,
          data: toData(photoUrl),
        },
      });
      // report success or failure
      setSucceeded(true);
      onSuccess?.();
    } catch (e) {
      setErrors(["Unexpected error occurred"]);
      console.error(`submitPhoto failed with error:`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
    file,
    createSubmission,
    engagementId,
    toData,
    onSuccess,
    createPresignedUrl,
  ]);

  return {
    createSubmission: sendSubmission,
    uploadProgress,
    errors,
    loading,
    succeeded,
  };
}
