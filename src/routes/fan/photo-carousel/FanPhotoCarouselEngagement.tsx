import { FanEngagementFragment } from "@/gql/graphql";
import { NewPhotoForm } from "./NewPhotoForm";

export function FanPhotoCarouselEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  return <NewPhotoForm engagement={engagement} />;
}
