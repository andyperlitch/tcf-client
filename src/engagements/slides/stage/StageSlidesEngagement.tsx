import { CodeBlock } from "@/components/CodeBlock";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useMemo } from "react";

export const StageSlidesEngagement = ({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) => {
  const currentSlideId = useMemo(() => {
    console.log(`andy engagement.viewData`, engagement.viewData);
    if (engagement.viewData.__typename === "SlidesViewData") {
      return engagement.viewData.currentSlide;
    }
    return null;
  }, [engagement.viewData]);

  const { data /* , loading, error  */ } = useStageGetSubmissionQuery({
    skip: typeof currentSlideId !== "number",
    variables: { id: currentSlideId! },
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <CodeBlock json={data} />
    </div>
  );
};
