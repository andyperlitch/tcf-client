import { AdminSubmissionFormProps } from "@/engagements/base/EngagementDefinition";
import { VoteForChoiceForm } from "./VoteForChoiceForm";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { VoteForSubmissionData } from "@/gql/graphql";

export function CreateVoteForChoiceForm({
  engagementId,
}: AdminSubmissionFormProps) {
  const { createSubmission } = useCreateSubmission<VoteForSubmissionData>();
  return (
    <VoteForChoiceForm
      onSubmit={({ data, uploads }) => {
        createSubmission({
          engagementId,
          data,
          uploads,
        });
        console.log("submitted", engagementId, data, uploads);
      }}
    />
  );
}
