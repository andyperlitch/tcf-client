import { Button } from "@/components/ui/button";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { TrashIcon } from "@radix-ui/react-icons";
import { useBandDeleteLeadSheetSectionMutation } from "@/gql/graphql";

export function LeadSheetSectionActionsCell() {
  const { state } = useLeadSheetSection();

  const [deleteSection] = useBandDeleteLeadSheetSectionMutation({
    update(cache) {
      cache.evict({
        id: cache.identify({ __typename: "LeadSheetSection", id: state.id }),
      });
      cache.gc();
    },
  });

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
