import { Button } from "@/components/ui/button";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { TrashIcon } from "@radix-ui/react-icons";
import { useBandDeleteLeadSheetSectionMutation } from "@/gql/graphql";

export function LeadSheetSectionActionsCell() {
  const { state } = useLeadSheetSection();

  const [deleteSection] = useBandDeleteLeadSheetSectionMutation();

  return (
    <div>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          deleteSection({
            variables: {
              leadSheetSectionId: state.id,
            },
          });
        }}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
