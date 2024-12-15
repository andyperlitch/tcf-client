import { AdminSubmissionFormProps } from "@/engagements/base/EngagementDefinition";
import { NowPlayingSongForm } from "./NowPlayingSongForm";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { NowPlayingSubmissionData } from "@/gql/graphql";

export function NewSongForm({
  engagementId,
  existingSubmissions,
}: AdminSubmissionFormProps) {
  console.log("NewSongForm", engagementId);

  const { createSubmission } = useCreateSubmission<NowPlayingSubmissionData>();

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
