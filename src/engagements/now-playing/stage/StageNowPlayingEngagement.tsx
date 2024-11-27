import { StageEngagementFragment } from "@/gql/graphql";

export function StageNowPlayingEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  return <div>{engagement.title}</div>;
}
