import { scaleLinear, ScaleLinear } from "d3-scale";
import {
  StageEngagementFragment,
  StageSubmissionFragment,
  useStageGetSubmissionsQuery,
  VoteForSubmissionData,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useEffect, useMemo, useRef, useState } from "react";
import elasticStyles from "@/styles/ElasticTransition.module.css";
import { useImageLoader } from "@/hooks/useImageLoader";
import { Loader } from "@/components/Loader";

export function StageVoteForEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const [voteScale, setVoteScale] = useState<ScaleLinear<
    number,
    number
  > | null>(null);
  const voteContainerRef = useRef<HTMLDivElement>(null);
  const choiceContainerRef = useRef<HTMLDivElement>(null);
  const [choiceWidth, setChoiceWidth] = useState(0);
  const voteCounts = useMemo(
    () =>
      (engagement.viewData?.__typename === "VoteForViewData"
        ? engagement.viewData.votes
        : []
      ).reduce((acc, vote) => {
        acc[vote.submissionId] = (acc[vote.submissionId] || 0) + vote.count;
        return acc;
      }, {} as Record<number, number>),
    [engagement.viewData]
  );

  const { data, loading, error } = useStageGetSubmissionsQuery({
    variables: { engagementId: engagement.id },
  });

  useEffect(() => {
    if (data?.submissions.length && voteContainerRef.current) {
      const newChoiceWidth = Math.min(
        (voteContainerRef.current.clientWidth / data?.submissions.length) * 0.8,
        100
      );
      setChoiceWidth(newChoiceWidth);
      const maxVotes = Math.max(
        data.submissions.length,
        ...Object.values(voteCounts)
      );
      const newVoteScale = scaleLinear(
        [0, maxVotes],
        [
          0,
          voteContainerRef.current?.clientHeight
            ? voteContainerRef.current?.clientHeight * 0.6
            : 0,
        ]
      );
      setVoteScale(() => newVoteScale);
    }
  }, [data?.submissions.length, engagement.viewData, voteCounts]);

  return (
    <div
      ref={voteContainerRef}
      data-name="VOTE-FOR-CONTAINER"
      className="flex h-full w-full flex-col items-end justify-around"
    >
      {loading && <Loader />}
      {error && <div>Error: {error.message}</div>}
      {/* This div creates the space between the choices container and the top of the vote for container */}
      <div data-name="CHOICE-RANGE-REF" className="w-full flex-1" />
      <div
        ref={choiceContainerRef}
        data-name="CHOICE-CONTAINER"
        className={`flex w-full flex-row justify-around`}
      >
        {data?.submissions.map((choice) => (
          <Choice
            key={choice.id}
            choice={choice}
            votes={voteCounts[choice.id] || 0}
            handleClick={() => {}}
            // make width based on container width
            width={choiceWidth}
            voteScale={voteScale}
          />
        ))}
      </div>
    </div>
  );
}

const Choice = ({
  votes,
  choice,
  handleClick,
  width,
  voteScale,
}: {
  votes: number;
  choice: StageSubmissionFragment;
  handleClick: (choice: StageSubmissionFragment) => void;
  width: number;
  voteScale?: ScaleLinear<number, number> | null;
}) => {
  const data = (choice.data || {}) as VoteForSubmissionData;
  const { imageLoaded, url } = useImageLoader({
    url: data.optionalImageUrl ? toFullS3Url(data.optionalImageUrl) : undefined,
  });
  const widthScale = useMemo(
    () =>
      voteScale
        ? voteScale.copy().range([4, 10])
        : scaleLinear([0, 10], [4, 10]),
    [voteScale]
  );
  const { voteStyles, voteBarStyles, imageStyles, imageWrapperStyles } =
    useMemo(() => {
      const voteSize = width / 2;

      const voteHeight = imageLoaded && voteScale ? voteScale?.(votes) : 0;
      return {
        voteStyles: {
          width: voteSize,
          height: voteSize,
          boxShadow: `0 0 0 ${widthScale(votes)}px ${data.color}`,
        },
        voteBarStyles: {
          height: `${voteHeight + voteSize * 2}px`,
          top: `${voteSize - voteHeight}px`,
          backgroundColor: data.color,
          width: voteSize,
          borderRadius: `${voteSize / 2}px`,
        },
        imageStyles: {
          border: `4px solid white`,
          width,
          height: width,
        },
        imageWrapperStyles: {
          top: `-${voteHeight}px`,
          backgroundColor: "black",
          borderColor: data.color,
        },
      };
    }, [width, imageLoaded, voteScale, votes, widthScale, data.color]);

  return (
    <div
      data-name="CHOICES-CONTAINER"
      key={choice.id}
      className={`
        relative flex flex-col items-center justify-center pb-4
        transition-opacity

        ${imageLoaded ? `opacity-100` : "opacity-20"}
      `}
      onClick={() => handleClick(choice)}
    >
      <div
        data-name="VOTE-BAR"
        className={`
          absolute

          ${elasticStyles.elastic}
        `}
        style={voteBarStyles}
      />

      <div
        data-name="CHOICE-IMAGE-WRAPPER"
        style={imageWrapperStyles}
        className={`
          relative flex items-center justify-center rounded-full border-8
          border-solid

          ${elasticStyles.elastic}
        `}
      >
        {!imageLoaded && (
          <Loader
            className={`absolute flex h-full w-full items-center justify-center`}
          />
        )}
        <img
          data-name="CHOICE-IMAGE"
          src={url}
          style={imageStyles}
          className={`
            rounded-full transition-opacity

            ${imageLoaded ? "opacity-100" : `opacity-0`}
          `}
        />
      </div>

      <div
        data-name="CHOICE-VOTE-COUNT"
        style={voteStyles}
        className={`
          relative z-10 flex items-center justify-center rounded-full

          ${elasticStyles.elastic}

          bg-foreground text-center font-margarine text-3xl text-background
        `}
      >
        {votes}
      </div>

      <div
        data-name="CHOICE-TITLE"
        style={{
          boxShadow: `3px -3px 0 ${data.color}`,
        }}
        className={`
          relative z-10 mb-2 max-w-[30vw] rounded-lg bg-foreground pb-0 pl-4
          pr-4 pt-0 text-center font-hand text-3xl text-background
        `}
      >
        {data.title}
      </div>
    </div>
  );
};
