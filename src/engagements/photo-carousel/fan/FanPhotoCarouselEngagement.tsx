import {
  FanEngagementFragment,
  useCanCreateSubmissionQuery,
} from "@/gql/graphql";
import { NewPhotoForm } from "./NewPhotoForm";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export function FanPhotoCarouselEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleSuccess = useCallback(() => {
    setHasSubmitted(true);
  }, []);
  const { data } = useCanCreateSubmissionQuery({
    skip: !engagement.id,
    variables: { engagementId: engagement.id },
  });

  if (hasSubmitted) {
    return (
      <div
        className={`
          flex h-screen flex-col items-center justify-center space-y-4 p-8
          text-center
        `}
      >
        <div className="text-6xl">🤳</div>
        <h3 className="font-fan text-2xl">
          You should see your photo on the screen soon!
        </h3>
        {data?.canCreateSubmission && (
          <Button
            className="font-fan text-2xl"
            variant="default"
            onClick={() => setHasSubmitted(false)}
          >
            take another
          </Button>
        )}
      </div>
    );
  }

  return <NewPhotoForm engagement={engagement} onSuccess={handleSuccess} />;
}
