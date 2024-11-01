import {
  useCreateSubmissionPresignedUrlMutation,
  useFanCreateSubmissionMutation,
} from "@/gql/graphql";
import { uploadFile } from "@/utils/uploadFile";
import { useCallback, useState } from "react";

export function useFanPhotoCarouselSubmit({
  engagementId,
  mimeType,
  file,
  caption,
}: {
  engagementId: number;
  mimeType: string;
  file: File | undefined;
  caption: string;
}) {
  const [createPresignedUrl] = useCreateSubmissionPresignedUrlMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [succeeded, setSucceeded] = useState(false);
  const [createSubmission] = useFanCreateSubmissionMutation();

  const submitPhoto = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    setUploadProgress(0);
    setSucceeded(false);
    try {
      // pre-flight conditions
      if (!file) {
        setErrors(["No file selected"]);
        setLoading(false);
        return;
      }

      // retrieve a presigned upload URL
      const { data, errors } = await createPresignedUrl({
        variables: {
          engagementId,
          mimeType,
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
      const { url, key: photoUrl } = data.createSubmissionPresignedUrl;
      await uploadFile({
        file,
        presignedUrl: url,
        onProgress: (progress) => setUploadProgress(progress),
      });

      // once upload is complete, submit photo and caption to the backend
      const newSubmission = await createSubmission({
        variables: {
          engagementId,
          data: {
            photoUrl,
            caption,
          },
        },
      });
      // report success or failure
      console.log(`andy newSubmission`, newSubmission);
      setSucceeded(true);
    } catch (e) {
      setErrors(["Unexpected error occurred"]);
      console.error(`submitPhoto failed with error:`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
    createPresignedUrl,
    engagementId,
    mimeType,
    file,
    createSubmission,
    caption,
  ]);

  return {
    submitPhoto,
    uploadProgress,
    errors,
    loading,
    succeeded,
  };
}
