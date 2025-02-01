import { CommandGroup, CommandItem } from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBandCreateGigSongMutation, useBandSongsQuery } from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";

const logger = createLogger("AddGigSongInput");

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
    (songId: number) => {
      logger.info("Adding song to set: ", {
        songId,
        setId: gigSetId,
      });

      createGigSong({
        variables: {
          gigSetId,
          data: {
            songId,
          },
        },
      }).then(() => {
        logger.info("Song added to set: ", {
          songId,
          setId: gigSetId,
        });
        onSuccess?.();
      });
    },
    [createGigSong, gigSetId, onSuccess]
  );

  const songs =
    songsData?.songs.map((song) => ({
      value: `${song.id}:${song.title} - ${song.artist}`,
      id: song.id,
      label: song.title,
    })) || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          add a song...
          <CaretSortIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No songs found.</CommandEmpty>
            <CommandGroup>
              {songs.map((song) => (
                <CommandItem
                  key={song.id}
                  value={song.value}
                  onSelect={(currentValue) => {
                    const id = Number(currentValue.split(":")[0]);
                    onSongSelected(id);
                    setSearchValue("");
                  }}
                >
                  {song.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
