import { EditableMarkdown } from "@/components/EditableMarkdown";
import { EditableText } from "@/components/EditableText";
import {
  AdminSubmissionFragment,
  SlidesSubmissionData,
  useAdminUpdateSubmissionMutation,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useCallback } from "react";

export function AdminSlidePage({
  submission,
}: {
  submission: AdminSubmissionFragment;
}) {
  const submissionData = submission.data as SlidesSubmissionData;

  const [updateSubmission] = useAdminUpdateSubmissionMutation();

  const updateSlideContent = useCallback(
    (content: string) => {
      updateSubmission({
        variables: {
          id: submission.id,
          data: { ...submissionData, content },
        },
      });
    },
    [updateSubmission, submission.id, submissionData]
  );

  const updateSlideTitle = useCallback(
    (title: string) => {
      updateSubmission({
        variables: { id: submission.id, data: { ...submissionData, title } },
      });
    },
    [updateSubmission, submission.id, submissionData]
  );

  return (
    <div data-name="ADMIN-SLIDE-PAGE" className="flex flex-col space-y-4">
      <div>
        <div className="text-sm text-muted">Slide Title</div>
        <EditableText
          value={submissionData.title}
          setValue={(value) => updateSlideTitle(value)}
          element="h2"
          className="text-3xl"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-sm text-muted">Slide Content</div>
        <EditableMarkdown
          value={submissionData.content}
          setValue={(value) => updateSlideContent(value)}
        />
      </div>
      <div>
        <div className="text-sm text-muted">Slide Photo</div>
        {submissionData.optionalImageUrl ? (
          <img
            className="h-[30vh]"
            src={toFullS3Url(submissionData.optionalImageUrl)}
          />
        ) : (
          <div>No photo</div>
        )}
      </div>
    </div>
  );
}
