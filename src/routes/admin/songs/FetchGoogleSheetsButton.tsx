import { Button } from "@/components/ui/button";
import { useBandSyncSongsFromGoogleSheetsMutation } from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export function FetchGoogleSheetsButton() {
  const [syncSongsFromGoogleSheets, { loading }] =
    useBandSyncSongsFromGoogleSheetsMutation();

  const { toast } = useToast();

  const handleClick = () => {
    syncSongsFromGoogleSheets({
      variables: {
        input: {},
      },
    })
      .then((res) => {
        toast({
          title: "Songs synced from Google Sheets",
          description: `Synced ${res.data?.syncSongsFromGoogleSheets.length} songs`,
          variant: "informational",
        });
      })
      .catch((error) => {
        toast({
          title: "Error syncing songs from Google Sheets",
          variant: "destructive",
        });
        console.error(error);
      });
  };

  return (
    <Button
      disabled={loading}
      variant="informational"
      size="sm"
      onClick={handleClick}
    >
      <ReloadIcon className="mr-2 h-4 w-4" />
      Sync Songs from Google Sheets
    </Button>
  );
}
