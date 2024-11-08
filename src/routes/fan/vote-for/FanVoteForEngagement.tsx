import {
  FanEngagementFragment,
  FanSubmissionFragment,
  useCreateReactionMutation,
  useFanGetSubmissionsQuery,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useMemo, useState } from "react";
import styles from "@/styles/Bounce.module.css";
import { useImageLoader } from "@/hooks/useImageLoader";
import pulseStyles from "@/styles/Pulse.module.css";
import { Loader } from "@/components/Loader";
import useWindowSize from "@/hooks/useWindowSize";

export function FanVoteForEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const { data } = useFanGetSubmissionsQuery({
    variables: {
      engagementId: engagement.id,
    },
  });
  const choices = data?.submissions ?? [];
  const [chosen, setChosen] = useState<FanSubmissionFragment | null>(null);
  const { width } = useWindowSize();
  const choiceWidth = Math.min(width / 3, 100);

  const [createReaction] = useCreateReactionMutation();

  const handleChoiceClick = (choice: FanSubmissionFragment) => {
    setChosen(choice);
    createReaction({
      variables: {
        submissionId: choice.id,
        type: "upvote",
      },
    });
  };
  return (
    <div
      data-name="vote-for-container"
      className={`flex h-screen w-screen flex-col items-center space-y-4`}
    >
      <div className="flex h-[30vh] flex-col items-center justify-center">
        <h1 className="font-hand text-5xl">{engagement.description}</h1>
      </div>
      <div data-name="choices" className="flex flex-wrap justify-center">
        {choices.map((choice) => (
          <Choice
            key={choice.id}
            choice={choice}
            handleClick={handleChoiceClick}
            isChosen={chosen?.id === choice.id}
            width={choiceWidth}
          />
        ))}
      </div>
    </div>
  );
}

const Choice = ({
  choice,
  handleClick,
  isChosen,
  width,
}: {
  choice: FanSubmissionFragment;
  handleClick: (choice: FanSubmissionFragment) => void;
  isChosen: boolean;
  width: number;
}) => {
  const { imageLoaded } = useImageLoader({
    url: choice.data.photoUrl ? toFullS3Url(choice.data.photoUrl) : undefined,
  });
  const imgCtnrStyles = useMemo(
    () => ({
      backgroundColor: "black",
      border: `4px solid ${choice.data.color}`,
    }),
    [choice.data.color]
  );
  const imageStyles = useMemo(
    () => ({
      border: `${isChosen ? "6px" : "4px"} solid ${
        isChosen ? choice.data.color : "white"
      }`,
      width,
      height: width,
    }),
    [choice.data.color, width, isChosen]
  );
  return (
    <div
      key={choice.id}
      className={`
        relative mb-8 ml-[5vw] mr-[5vw]

        w-[${width}px]

        transition-opacity

        ${
          imageLoaded
            ? `
              opacity-100

              ${pulseStyles.pulse}
            `
            : `opacity-20`
        }
      `}
      onClick={() => !isChosen && handleClick(choice)}
    >
      <div
        data-name="title"
        style={{
          boxShadow: `${isChosen ? `5px -5px` : `3px -3px`} 0 ${
            choice.data.color
          }`,
        }}
        className={`
          absolute -bottom-4 z-10 max-w-[30vw] rounded-lg bg-foreground pb-0
          pl-4 pr-4 pt-0 font-hand text-3xl text-background

          ${isChosen ? styles.bounce : ""}
        `}
      >
        {choice.data.title}
      </div>
      <div
        style={imgCtnrStyles}
        className={`
          relative flex items-center justify-center rounded-full bg-muted
        `}
      >
        {!imageLoaded && (
          <Loader
            className={`absolute flex h-full w-full items-center justify-center`}
          />
        )}
        <img
          data-name="image"
          src={toFullS3Url(choice.data.photoUrl)}
          style={imageStyles}
          className={`
            rounded-full transition-opacity

            ${imageLoaded ? "opacity-100" : `opacity-0`}
            ${isChosen && imageLoaded ? styles.bounce : ""}
          `}
        />
      </div>
    </div>
  );
};
