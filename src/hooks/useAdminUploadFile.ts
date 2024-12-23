import { useAdminCreatePresignedUrlMutation } from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { uploadFile } from "@/utils/uploadFile";
import { useCallback, useState } from "react";

export function useAdminUploadFile() {
  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();

  const [loading, setLoading] = useState(false);

  const adminUploadFile = useCallback(
    async (file: File) => {
      setLoading(true);
      try {
        const { data } = await createPresignedUrl({
          variables: { mimeType: file.type },
        });
        const { url, key } = data?.adminCreatePresignedUrl || {};
        if (!url || !key) {
          throw new Error("Failed to create presigned URL");
        }
        await uploadFile({
          file,
          presignedUrl: url,
          onProgress: (progress) => {
            console.log(progress);
          },
        });
        setLoading(false);
        return toFullS3Url(key);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [createPresignedUrl]
  );

  return [adminUploadFile, { loading }] as const;
}
