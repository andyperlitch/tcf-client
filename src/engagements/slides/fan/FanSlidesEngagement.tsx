import {
  FanEngagementFragment,
  SlidesViewData,
  useCreateReactionMutation,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./FanSlidesEngagement.module.css";
import { useImageLoader } from "@/hooks/useImageLoader";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { FanReactionButtons } from "@/components/FanReactionButtons";

const REACTIONS = ["👍", "🤩", "🎉", "👏"];

export const FanSlidesEngagement = ({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) => {
  const currentSlideId = useMemo(() => {
    const viewData = engagement.viewData as SlidesViewData;
    return viewData.currentSlide;
  }, [engagement.viewData]);

  const { data } = useStageGetSubmissionQuery({
    skip: typeof currentSlideId !== "number" || currentSlideId === 0,
    variables: { id: currentSlideId },
  });

  const content = useMemo(() => {
    if (data?.submission?.data?.__typename === "SlidesSubmissionData") {
      return data.submission.data.content;
    }
    return "";
  }, [data?.submission?.data]);

  const imageUrl = useMemo(() => {
    if (
      data?.submission?.data?.__typename === "SlidesSubmissionData" &&
      data.submission.data.optionalImageUrl
    ) {
      return toFullS3Url(data.submission.data.optionalImageUrl);
    }
    return null;
  }, [data?.submission?.data]);

  const { imageLoaded } = useImageLoader({ url: imageUrl });

  const [createReaction] = useCreateReactionMutation();

  const handleReaction = (type: string) => {
    if (!createReaction) {
      return;
    }

    createReaction({
      variables: { submissionId: currentSlideId, type },
    });
  };

  return (
    <div
      data-name="FAN-SLIDES-ENGAGEMENT"
      className="flex flex-col items-center justify-center pt-4"
    >
      {imageUrl ? (
        <img
          className={`
            relative z-10 -mb-36 w-1/3 rounded bg-white p-2 shadow-sm
            transition-opacity duration-500

            ${
              imageLoaded
                ? `
                  opacity-100

                  ${styles.tiltImage}
                `
                : `opacity-0`
            }
          `}
          src={imageUrl}
          alt="Slide Image"
        />
      ) : null}
      <Markdown className={styles.contentCard}>{content}</Markdown>
      <FanReactionButtons
        reactionTypes={REACTIONS}
        onReaction={handleReaction}
      />
    </div>
  );
};
