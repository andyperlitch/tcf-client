import {
  useCreateSubmissionPresignedUrlMutation,
  useCreateSubmissionMutation,
  EngagementSubmissionData,
} from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { uploadFile } from "@/utils/uploadFile";
import { useCallback, useState } from "react";

const logger = createLogger("useCreateSubmission");

export interface Upload<T extends EngagementSubmissionData> {
  field: keyof T;
  file: File | null | undefined;
  type: "image";
}

export function useCreateSubmission<T extends EngagementSubmissionData>() {
  const [createPresignedUrl] = useCreateSubmissionPresignedUrlMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgresses, setUploadProgresses] = useState<number[]>([]);
  const [succeeded, setSucceeded] = useState(false);
  const [createSubmissionMutation] = useCreateSubmissionMutation();

  const createSubmission = useCallback(
    async ({
      engagementId,
      uploads,
      data: submissionData,
      onSuccess,
    }: {
      engagementId: number;
      uploads?: Upload<T>[];
      data: Partial<T>;
      onSuccess?: () => void;
    }) => {
      setLoading(true);
      setErrors([]);
      setUploadProgresses(([] as number[]).fill(0, 0, uploads?.length ?? 0));
      setSucceeded(false);
      try {
        if (uploads && uploads.length > 0) {
          // request all presigned URLs
          const presignedUrlResults = await Promise.all(
            uploads.map(async (upload) => {
              if (!upload.file?.type) {
                return {
                  errors: ["No file type"],
                };
              }
              try {
                return await createPresignedUrl({
                  variables: {
                    engagementId,
                    mimeType: upload.file?.type ?? "",
                  },
                });
              } catch (e) {
                logger.error(
                  `Error creating presigned URL for ${String(upload.field)}:`,
                  e
                );
                return {
                  errors: ["Error creating presigned URL"],
                };
              }
            })
          );

          // check for errors
          const presignedUrlErrors = presignedUrlResults
            .filter((result) => result.errors && result.errors.length)
            .map((result) => result.errors);

          if (presignedUrlErrors.length > 0) {
            setErrors(
              presignedUrlErrors.filter(Boolean).map((e) => e!.join(", "))
            );
            setLoading(false);
            return;
          }

          // proceed with upload, and report progress
          await Promise.all(
            presignedUrlResults.map(async (presignedUrlResult, index) => {
              const upload = uploads[index];
              if (
                "errors" in presignedUrlResult ||
                !presignedUrlResult.data?.createSubmissionPresignedUrl ||
                !(upload.file instanceof File)
              ) {
                setErrors(["No presigned URL returned"]);
                setLoading(false);
                return;
              }
              const { url, key } =
                presignedUrlResult.data.createSubmissionPresignedUrl;
              await uploadFile({
                file: upload.file,
                presignedUrl: url,
                onProgress: (progress) =>
                  setUploadProgresses((prev) => [
                    ...prev.slice(0, index),
                    progress,
                    ...prev.slice(index + 1),
                  ]),
              });
              submissionData[upload.field] = key as T[keyof T];
            })
          );
        }

        // once upload is complete, submit photo and caption to the backend
        const result = await createSubmissionMutation({
          variables: {
            engagementId,
            data: submissionData,
          },
        });

        // report success or failure
        setSucceeded(true);
        onSuccess?.();
        return result;
      } catch (e) {
        setErrors(["Unexpected error occurred"]);
        console.error(`submitPhoto failed with error:`);
        console.error(e);
        return {
          errors: ["Unexpected error occurred: " + e],
        };
      } finally {
        setLoading(false);
      }
    },
    [createSubmissionMutation, createPresignedUrl]
  );

  return {
    createSubmission,
    uploadProgress: Math.min(...uploadProgresses),
    errors,
    loading,
    succeeded,
  };
}
