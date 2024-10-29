import { StageEngagementFragment } from "@/gql/graphql";

export function StageVoteForEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  return <div>{engagement.title}</div>;
}
