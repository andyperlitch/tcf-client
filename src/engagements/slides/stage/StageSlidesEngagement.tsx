import Markdown from "react-markdown";
import styles from "./StageSlidesEngagement.module.css";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useMemo } from "react";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useImageLoader } from "@/hooks/useImageLoader";
import { StageReactions } from "@/components/StageReactions/StageReactions";

export const StageSlidesEngagement = ({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) => {
  const currentSlideId = useMemo(() => {
    if (engagement.viewData.__typename === "SlidesViewData") {
      return engagement.viewData.currentSlide;
    }
    return null;
  }, [engagement.viewData]);

  const { data /* , loading, error  */ } = useStageGetSubmissionQuery({
    skip: typeof currentSlideId !== "number",
    variables: { id: currentSlideId! },
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

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {content ? (
        <Markdown
          className={`
            ${styles.contentCard}
            ${imageLoaded ? styles.tiltContent : ""}
          `}
        >
          {content}
        </Markdown>
      ) : null}
      {imageUrl ? (
        <img
          className={`
            relative z-10 w-1/3 rounded bg-white p-2 shadow-sm
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
      {currentSlideId && <StageReactions submissionId={currentSlideId} />}
    </div>
  );
};
