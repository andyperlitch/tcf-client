import {
  FanEngagementFragment,
  FanSubmissionFragment,
  useCreateReactionMutation,
} from "@/gql/graphql";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useState } from "react";
import styles from "./Choice.module.css";

export function FanVoteForEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const choices = engagement.submissions;
  const [chosen, setChosen] = useState<FanSubmissionFragment | null>(null);

  const [createReaction] = useCreateReactionMutation();

  const handleChoiceClick = (choice: FanSubmissionFragment) => {
    console.log(choice);
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
      data-name="screen-container"
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
}: {
  choice: FanSubmissionFragment;
  handleClick: (choice: FanSubmissionFragment) => void;
  isChosen: boolean;
}) => {
  return (
    <div
      key={choice.id}
      className={`relative mb-8 ml-[5vw] mr-[5vw] w-[30vw]`}
      onClick={() => handleClick(choice)}
    >
      <div
        data-name="title"
        className={`
          absolute bottom-1 z-10 max-w-[30vw] rounded-lg bg-foreground pb-0 pl-4
          pr-4 pt-0 font-hand text-3xl text-background

          ${isChosen ? styles.bounce : ""}
        `}
      >
        {choice.data.title}
      </div>
      <img
        data-name="image"
        src={toFullS3Url(choice.data.photoUrl)}
        className={`
          w-[30vw] rounded-full border-solid

          ${isChosen ? `border-8 border-green-400` : `border-4 border-white`}
          ${isChosen ? styles.bounce : ""}
        `}
      />
    </div>
  );
};
