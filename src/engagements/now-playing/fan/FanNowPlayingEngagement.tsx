import { FanEngagementFragment } from "@/gql/graphql";

export function FanNowPlayingEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  return <div>{engagement.title}</div>;
}
