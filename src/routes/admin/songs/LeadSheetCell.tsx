import { Button } from "@/components/ui/button";
import { SongFragment, useBandCreateLeadSheetMutation } from "@/gql/graphql";
import { useToast } from "@/hooks/use-toast";
import { FileTextIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LeadSheetCell({ song }: { song: SongFragment }) {
  const [createLeadSheet] = useBandCreateLeadSheetMutation({
    update(cache, { data }) {
      if (data?.createLeadSheet) {
        cache.modify({
          id: cache.identify(song),
          fields: {
            leadSheetId: () => data.createLeadSheet.id,
          },
        });
      }
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateLeadSheet = useCallback(() => {
    createLeadSheet({ variables: { songId: song.id } })
      .then((res) => {
        if (res.data?.createLeadSheet.id) {
          navigate(`/admin/songs/${song.id}`);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error creating lead sheet",
          variant: "destructive",
        });
      });
  }, [song.id, createLeadSheet, navigate, toast]);

  return (
    <div className="flex items-center justify-start gap-2">
      {song.leadSheetEditUrl && (
        <a
          className="text-sm"
          href={`${song.leadSheetEditUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <FileTextIcon className="h-4 w-4" />
        </a>
      )}
      {song.leadSheetId ? (
        <Link to={`/admin/songs/${song.id}`}>
          <Pencil1Icon className="h-4 w-4" />
        </Link>
      ) : (
        <Button variant="link" size="link" onClick={handleCreateLeadSheet}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
