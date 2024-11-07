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

    await Promise.all(
      submissions.map(async (submission, i) => {
        await updateSubmission({
          variables: {
            id: submission.id,
            data: { ...submission.data, color: COLORS[i] },
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
