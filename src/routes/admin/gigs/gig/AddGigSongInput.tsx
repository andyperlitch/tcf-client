import { useBandCreateGigSongMutation, useBandSongsQuery } from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { useCallback, useMemo, useState } from "react";
import { Autocomplete } from "@/components/ui/autocomplete";

const logger = createLogger("AddGigSongInput");
interface Option {
  value: string;
  id: number;
  label: string;
  keywords?: string[];
}

export function AddGigSongInput({
  gigSetId,
  onSuccess,
}: {
  gigSetId: number;
  onSuccess?: () => void;
}) {
  const [createGigSong] = useBandCreateGigSongMutation();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data: songsData } = useBandSongsQuery();

  const onSongSelected = useCallback(
    ({ id }: Option) => {
      logger.info("Adding song to set: ", {
        songId: id,
        setId: gigSetId,
      });

      createGigSong({
        variables: {
          gigSetId,
          data: {
            songId: id,
          },
        },
      }).then(() => {
        logger.info("Song added to set: ", {
          songId: id,
          setId: gigSetId,
        });
        onSuccess?.();
        setSearchValue("");
      });
    },
    [createGigSong, gigSetId, onSuccess]
  );

  const songs: Option[] = useMemo(
    () =>
      songsData?.songs.map((song) => ({
        value: `${song.id}`,
        id: song.id,
        label: song.title || `Untitled (${song.id})`,
        keywords: [song.title, song.artist].filter(Boolean) as string[],
      })) || [],
    [songsData]
  );

  return (
    <Autocomplete
      items={songs}
      onSelect={onSongSelected}
      open={open}
      setOpen={setOpen}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
    />
  );
}
