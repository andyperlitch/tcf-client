import { AdminSubmissionFormProps } from "@/engagements/base/EngagementDefinition";
import { NowPlayingSongForm } from "./NowPlayingSongForm";
import { useAdminCreateSubmission } from "@/hooks/useAdminCreateSubmission";
import { NowPlayingSubmissionData } from "@/gql/graphql";

export function NewSongForm({
  engagementId,
  existingSubmissions,
}: AdminSubmissionFormProps) {
  console.log("NewSongForm", engagementId);

  const { createSubmission } =
    useAdminCreateSubmission<NowPlayingSubmissionData>();

  return (
    <NowPlayingSongForm
      onSubmit={({ data, uploads }) => {
        createSubmission({
          engagementId,
          data: {
            ...data,
            order: existingSubmissions?.length ?? 0,
          },
          uploads,
        });
        console.log("submitted", engagementId, data, uploads);
      }}
    />
  );
}
