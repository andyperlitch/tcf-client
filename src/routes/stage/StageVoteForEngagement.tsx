import { scaleLinear, ScaleLinear } from "d3-scale";

import {
  StageEngagementFragment,
  StageSubmissionFragment,
  useStageGetSubmissionsQuery,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useEffect, useMemo, useRef, useState } from "react";
import pulseStyles from "@/styles/Pulse.module.css";
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
  const choiceRangeRef = useRef<HTMLDivElement>(null);
  const choiceContainerRef = useRef<HTMLDivElement>(null);
  const [choiceWidth, setChoiceWidth] = useState(0);
  const voteCounts = useMemo(
    () =>
      (engagement.viewData?.__typename === "VoteForData"
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
    if (data?.submissions.length && choiceRangeRef.current) {
      const newChoiceWidth =
        (choiceRangeRef.current.clientWidth / data?.submissions.length) * 0.8;
      setChoiceWidth(newChoiceWidth);
      const maxVotes = Math.max(
        data.submissions.length,
        ...Object.values(voteCounts)
      );
      const newVoteScale = scaleLinear(
        [0, maxVotes],
        [
          0,
          choiceRangeRef.current?.clientHeight
            ? choiceRangeRef.current?.clientHeight - newChoiceWidth * 1.5
            : 0,
        ]
      );
      setVoteScale(() => newVoteScale);
    }
  }, [data?.submissions.length, engagement.viewData, voteCounts]);

  return (
    <div
      ref={choiceRangeRef}
      data-name="vote-for-container"
      className="flex h-full w-full flex-col items-end justify-around"
    >
      {loading && <Loader />}
      {error && <div>Error: {error.message}</div>}
      {/* This div is not actually used visually, but meant to create a range for the scale */}
      <div data-name="choice-range-ref" className="w-full flex-1" />
      <div
        ref={choiceContainerRef}
        data-name="choices"
        className={`flex w-full flex-row justify-around`}
      >
        {data?.submissions.map((choice) => (
          <Choice
            key={choice.id}
            choice={choice}
            votes={voteCounts[choice.id]}
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
  const { imageLoaded, url } = useImageLoader({
    url: choice.data.photoUrl ? toFullS3Url(choice.data.photoUrl) : undefined,
  });
  const widthScale = useMemo(
    () =>
      voteScale
        ? voteScale.copy().range([4, 10])
        : scaleLinear([0, 10], [4, 10]),
    [voteScale]
  );
  const { voteStyles, votePollStyles } = useMemo(() => {
    const voteSize = width / 2;

    const voteHeight = imageLoaded && voteScale ? voteScale?.(votes) : 0;
    return {
      voteStyles: {
        width: voteSize,
        height: voteSize,
        boxShadow: `0 0 0 ${widthScale(votes)}px ${choice.data.color}`,
        top: `-${voteHeight}px`,
      },
      votePollStyles: {
        height: `${voteHeight + voteSize}px`,
        // top: `calc(${voteSize} - ${voteHeight}px)`,
        top: `${voteSize / 2 - voteHeight}px`,
        backgroundColor: choice.data.color,
        // width: `${widthScale(votes)}px`,
        width: voteSize,
      },
    };
  }, [width, imageLoaded, voteScale, votes, widthScale, choice.data.color]);

  const imageStyles = useMemo(
    () => ({
      border: `4px solid white`,
      width,
      height: width,
    }),
    [width]
  );

  return (
    <div
      key={choice.id}
      className={`
        relative flex flex-col items-center justify-center transition-opacity

        ${
          imageLoaded
            ? `
              opacity-100

              ${pulseStyles.pulse}
            `
            : "opacity-20"
        }
      `}
      onClick={() => handleClick(choice)}
    >
      <div
        className={`
          absolute

          ${elasticStyles.elastic}
        `}
        style={votePollStyles}
      />
      <div
        data-name="votes"
        style={voteStyles}
        className={`
          relative z-10 flex items-center justify-center rounded-full

          ${elasticStyles.elastic}

          bg-foreground font-margarine text-center text-3xl text-background
        `}
      >
        {votes}
      </div>
      <div
        style={{
          backgroundColor: "black",
          borderColor: choice.data.color,
        }}
        className={`
          relative flex items-center justify-center rounded-full border-4
          border-solid
        `}
      >
        {!imageLoaded && (
          <Loader
            className={`absolute flex h-full w-full items-center justify-center`}
          />
        )}
        <img
          data-name="image"
          src={url}
          style={imageStyles}
          className={`
            rounded-full transition-opacity

            ${imageLoaded ? "opacity-100" : `opacity-0`}
          `}
        />
      </div>

      <div
        data-name="title"
        style={{
          boxShadow: `3px -3px 0 ${choice.data.color}`,
        }}
        className={`
          relative z-10 -mt-4 mb-2 max-w-[30vw] rounded-lg bg-foreground pb-0
          pl-4 pr-4 pt-0 text-center font-hand text-3xl text-background
        `}
      >
        {choice.data.title}
      </div>
    </div>
  );
};
