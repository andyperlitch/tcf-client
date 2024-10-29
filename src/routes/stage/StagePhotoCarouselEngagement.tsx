import { CodeBlock } from "@/components/CodeBlock";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";

export function StagePhotoCarouselEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const visibleSubmissionId = engagement.viewData?.visibleSubmission;
  const { data, loading, error } = useStageGetSubmissionQuery({
    skip: !visibleSubmissionId,
    variables: { id: visibleSubmissionId },
  });

  return (
    <div>
      <h1>{engagement.title}</h1>
      {/* <CodeBlock json={engagement.viewData} />
      {visibleSubmission && <CodeBlock json={visibleSubmission} />} */}
      {data?.submission?.data?.photoUrl && (
        <img
          width="300"
          src={`https://thecasualfunk.s3.us-west-1.amazonaws.com/${data.submission.data.photoUrl}`}
        />
      )}
    </div>
  );
}
