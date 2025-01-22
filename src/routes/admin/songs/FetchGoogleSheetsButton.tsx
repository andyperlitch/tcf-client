import { Button } from "@/components/ui/button";

export function FetchGoogleSheetsButton() {
  const handleClick = () => {};

  return (
    <Button variant="informational" size="sm" onClick={handleClick}>
      Fetch from Google Sheets
    </Button>
  );
}
