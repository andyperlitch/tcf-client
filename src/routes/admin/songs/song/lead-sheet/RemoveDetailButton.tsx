import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { removeDetail } from "./LeadSheetSectionProvider/reducer";
import { Cross2Icon } from "@radix-ui/react-icons";
import { InlineConfirmButton } from "@/components/InlineConfirmButton";

export function RemoveDetailButton({ id }: { id: string }) {
  const { dispatch } = useLeadSheetSection();
  return (
    <InlineConfirmButton
      variant="link"
      size="icon"
      message="Remove detail?"
      onConfirm={() => Promise.resolve(dispatch(removeDetail({ id })))}
    >
      <Cross2Icon className="h-4 w-4" />
    </InlineConfirmButton>
  );
}
