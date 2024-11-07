import {
  StageEngagementFragment,
  useStageGetSubmissionsQuery,
  VoteForData,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";

export function StageVoteForEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const { votes } = (engagement.viewData || { votes: [] }) as VoteForData;
  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote.submissionId] = (acc[vote.submissionId] || 0) + vote.count;
    return acc;
  }, {} as Record<number, number>);

  const { data, loading, error } = useStageGetSubmissionsQuery({
    variables: { engagementId: engagement.id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-row">
      {data?.submissions.map((choice) => (
        <div key={choice.id} className="flex flex-col">
          <div>{choice.data.title}</div>
          {choice.data.photoUrl && (
            <img
              src={toFullS3Url(choice.data.photoUrl)}
              className={`w-[10vw] rounded-full`}
            />
          )}
          <div>{voteCounts[choice.id]}</div>
        </div>
      ))}
    </div>
  );
}
