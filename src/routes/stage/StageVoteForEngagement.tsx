import {
  StageEngagementFragment,
  StageSubmissionFragment,
  useStageGetSubmissionsQuery,
  VoteForData,
} from "@/gql/graphql";
import useWindowSize from "@/hooks/useWindowSize";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useEffect, useMemo, useRef, useState } from "react";
import pulseStyles from "@/styles/Pulse.module.css";
import { useImageLoader } from "@/hooks/useImageLoader";
import { Loader } from "@/components/Loader";
export function StageVoteForEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [choiceWidth, setChoiceWidth] = useState(0);
  const { votes } = (engagement.viewData || { votes: [] }) as VoteForData;
  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote.submissionId] = (acc[vote.submissionId] || 0) + vote.count;
    return acc;
  }, {} as Record<number, number>);

  const { data, loading, error } = useStageGetSubmissionsQuery({
    variables: { engagementId: engagement.id },
  });

  useEffect(() => {
    if (containerRef.current && data?.submissions.length) {
      setChoiceWidth(
        (containerRef.current.clientWidth / data?.submissions.length) * 0.8
      );
    }
  }, [data?.submissions.length]);

  return (
    <div
      data-name="vote-for-container"
      className="flex h-full w-full flex-row items-end justify-around"
      ref={containerRef}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data?.submissions.map((choice) => (
        <Choice
          key={choice.id}
          choice={choice}
          votes={voteCounts[choice.id]}
          handleClick={() => {}}
          // make width based on container width
          width={`${choiceWidth}px`}
        />
      ))}
    </div>
  );
}

const Choice = ({
  votes,
  choice,
  handleClick,
  width,
}: {
  votes: number;
  choice: StageSubmissionFragment;
  handleClick: (choice: StageSubmissionFragment) => void;
  width: number | string;
}) => {
  const { imageLoaded, url } = useImageLoader({
    url: choice.data.photoUrl ? toFullS3Url(choice.data.photoUrl) : undefined,
  });
  const voteRef = useRef<HTMLDivElement>(null);
  const voteStyles = useMemo(() => {
    const voteSize =
      typeof width === "number" ? `${width / 2}px` : `calc(${width}/2)`;
    return {
      width: voteSize,
      height: voteSize,
      boxShadow: `2px -1px 0 2px ${choice.data.color}`,
    };
  }, [width, choice.data.color]);

  const { width: screenWidth, height: screenHeight } = useWindowSize();

  useEffect(() => {
    if (voteRef.current) {
      const rect = voteRef.current.getBoundingClientRect();
      console.log({
        rect,
        element: voteRef.current,
        screenWidth,
        screenHeight,
      });
    }
  }, [screenHeight, screenWidth]);

  const imageStyles = useMemo(
    () => ({
      border: `4px solid ${choice.data.color}`,
      width,
      height: width,
    }),
    [choice.data.color, width]
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
        ref={voteRef}
        data-name="votes"
        style={voteStyles}
        className={`
          relative z-10 flex max-w-[30vw] items-center justify-center
          rounded-full bg-foreground font-margarine text-center text-3xl
          text-background
        `}
      >
        {votes}
      </div>
      <div
        style={{
          backgroundColor: choice.data.color,
        }}
        className={`
          relative flex items-center justify-center rounded-full border-4
          border-solid border-white
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
