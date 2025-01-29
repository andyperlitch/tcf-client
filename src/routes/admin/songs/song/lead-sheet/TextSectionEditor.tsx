import { Textarea } from "@/components/ui/textarea";
import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useCallback } from "react";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { updateDetail } from "./LeadSheetSectionProvider/reducer";
import { RemoveDetailButton } from "./RemoveDetailButton";

export function TextSectionEditor({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const { state, dispatch } = useLeadSheetSection();
  const isLastAddedDetail = state.lastAddedDetailId === detail.id;

  return (
    <div className="flex items-center gap-2">
      <RemoveDetailButton id={detail.id} />
      <Textarea
        autoFocus={isLastAddedDetail}
        value={detail.content}
        placeholder="add notes..."
        onChange={useCallback(
          (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(
              updateDetail({
                id: detail.id,
                content: e.target.value,
              })
            ),
          [dispatch, detail.id]
        )}
      />
    </div>
  );
}
