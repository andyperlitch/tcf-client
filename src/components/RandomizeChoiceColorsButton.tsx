import {
  AdminSubmissionFragment,
  useAdminUpdateSubmissionMutation,
} from "@/gql/graphql";
import { InlineConfirmButton } from "./InlineConfirmButton";
import { useCallback } from "react";
import { COLORS } from "@/consts/colors";

export function RandomizeChoiceColorsButton({
  submissions,
}: {
  submissions?: AdminSubmissionFragment[];
}) {
  const [updateSubmission] = useAdminUpdateSubmissionMutation();

  const randomizeChoiceColors = useCallback(async () => {
    if (!submissions || submissions.length === 0) {
      return;
    }

    const shuffledColors = randomizeColorArray();

    await Promise.all(
      submissions.map(async (submission, i) => {
        await updateSubmission({
          variables: {
            id: submission.id,
            data: { ...submission.data, color: shuffledColors[i] },
          },
        });
      })
    );
  }, [submissions, updateSubmission]);

  return (
    <InlineConfirmButton
      variant="default"
      onConfirm={randomizeChoiceColors}
      loading={false}
      error={undefined}
    >
      randomize colors
    </InlineConfirmButton>
  );
}

/**
 * Returns a new array with the colors shuffled
 */
function randomizeColorArray() {
  const array = COLORS.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
