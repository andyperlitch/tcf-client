import { Button } from "@/components/ui/button";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { RowsIcon, TextIcon } from "@radix-ui/react-icons";

export function LeadSheetSectionDetailsCell() {
  const { state } = useLeadSheetSection();

  return (
    <div>
      {state.details.map((detail, i) => (
        <div key={i}>
          ({detail.type}) {detail.content}
        </div>
      ))}
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <TextIcon className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <RowsIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
