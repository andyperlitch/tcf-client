import { FanEngagementFragment } from "@/gql/graphql";
import { NewPhotoForm } from "./NewPhotoForm";
import { useCallback } from "react";

export function FanPhotoCarouselEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const handleSuccess = useCallback(() => {}, []);

  return <NewPhotoForm engagement={engagement} onSuccess={handleSuccess} />;
}
