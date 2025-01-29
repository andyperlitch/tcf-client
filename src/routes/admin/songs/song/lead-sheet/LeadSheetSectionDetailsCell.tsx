import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import { addDetail } from "./LeadSheetSectionProvider/reducer";
import { LeadSheetDetailType } from "@/gql/graphql";
import { ChordSectionEditor } from "./ChordSectionEditor";
import { TextSectionEditor } from "./TextSectionEditor";
import { ImageSectionEditor } from "./ImageSectionEditor";

export function LeadSheetSectionDetailsCell({
  addDetailButtonsClassName,
}: {
  addDetailButtonsClassName?: string;
}) {
  const { state, dispatch } = useLeadSheetSection();

  return (
    <div data-name="DETAILS_CELL" className={`relative flex flex-col gap-2`}>
      {state.details.map((detail, i) => (
        <div key={i}>
          {detail.type === LeadSheetDetailType.Text && (
            <TextSectionEditor detail={detail} />
          )}
          {detail.type === LeadSheetDetailType.Chords && (
            <ChordSectionEditor detail={detail} />
          )}
          {detail.type === LeadSheetDetailType.Image && (
            <ImageSectionEditor detail={detail} />
          )}
        </div>
      ))}
      <div
        data-name="ADD_DETAIL_BUTTONS"
        className={`
          ml-12 flex gap-2

          ${addDetailButtonsClassName}
        `}
      >
        <Button
          size="sm"
          variant="outline"
          tooltip="Add text"
          onClick={useCallback(
            () =>
              dispatch(
                addDetail({
                  id: uuid(),
                  type: LeadSheetDetailType.Text,
                  content: "",
                })
              ),
            [dispatch]
          )}
        >
          <TextIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          tooltip="Add chords"
          onClick={useCallback(
            () =>
              dispatch(
                addDetail({
                  id: uuid(),
                  type: LeadSheetDetailType.Chords,
                  content: "",
                })
              ),
            [dispatch]
          )}
        >
          E♭
        </Button>
        <Button
          size="sm"
          variant="outline"
          tooltip="Add image"
          onClick={useCallback(
            () =>
              dispatch(
                addDetail({
                  id: uuid(),
                  type: LeadSheetDetailType.Image,
                  content: "",
                })
              ),
            [dispatch]
          )}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
