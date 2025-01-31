import { AdminContainer } from "@/components/AdminContainer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CommandItem } from "@/components/ui/command";
import { CommandGroup } from "@/components/ui/command";
import { CommandEmpty } from "@/components/ui/command";
import { CommandList } from "@/components/ui/command";
import { CommandInput } from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useBandCreateGigSetMutation,
  useBandCreateGigSongMutation,
  useBandGigQuery,
  useBandSongsQuery,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { createLogger } from "@/utils/createLogger";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const logger = createLogger("AdminGigPage");

const crumbs: CrumbMeta[] = [["/admin/gigs", "Gigs"]];

export function AdminGigPage() {
  const params = useParamsSafe("gigId");

  const {
    data: gigData,
    loading: gigLoading,
    error: gigError,
    refetch: refetchGig,
  } = useBandGigQuery({
    variables: {
      id: Number(params.gigId),
    },
    skip: !params.gigId,
  });

  const gig = gigData?.gig;

  const [createGigSong] = useBandCreateGigSongMutation();

  return (
    <AdminContainer section="gigs">
      <div className="flex flex-col gap-4">
        <div data-name="GIG_HEADER" className="flex flex-col gap-2">
          <SimpleCrumbs crumbs={crumbs} />
          <h1 className="text-2xl font-bold">{gigData?.gig?.name || "..."}</h1>
        </div>
        {gigLoading && <Loader />}
        {gigError && <ErrorMessage error={gigError} retry={refetchGig} />}
        {gig && (
          <div data-name="GIG_DETAILS" className="flex flex-col gap-4">
            <div
              data-name="GIG_SETS"
              className={`
                flex flex-col items-stretch justify-center gap-4

                md:flex-row
              `}
            >
              {gig.sets.map((set, index) => (
                <div
                  data-name="GIG_SET"
                  key={set.id}
                  className={`flex flex-1 items-center`}
                >
                  <Card className="w-full max-w-[800px]">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Set {index + 1}
                      </CardTitle>
                      <div data-name="GIG_SET_SONGS">
                        {set.songs.map((gigSong) => (
                          <div data-name="GIG_SET_SONG" key={gigSong.id}>
                            {gigSong.song?.title}
                          </div>
                        ))}
                      </div>
                      <AddSongInput
                        onSongSelected={(songId) => {
                          logger.info("Adding song to set: ", {
                            songId,
                            setId: set.id,
                          });

                          createGigSong({
                            variables: {
                              gigSetId: set.id,
                              data: {
                                songId,
                              },
                            },
                          }).then(() => {
                            logger.info("Song added to set: ", {
                              songId,
                              setId: set.id,
                            });
                            refetchGig();
                          });
                        }}
                      />
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
            <CreateGigSetButton
              className="self-start"
              gigId={gig.id}
              onSuccess={refetchGig}
            />
          </div>
        )}
      </div>
    </AdminContainer>
  );
}

function AddSongInput({
  onSongSelected,
}: {
  onSongSelected: (songId: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data: songsData } = useBandSongsQuery();

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

function CreateGigSetButton({
  gigId,
  onSuccess,
  className,
}: {
  gigId: number;
  onSuccess: () => void;
  className?: string;
}) {
  const [createGigSet, { loading }] = useBandCreateGigSetMutation();

  return (
    <Button
      className={className}
      disabled={loading}
      onClick={() =>
        createGigSet({
          variables: {
            gigId,
            data: {
              name: "Set 1",
            },
          },
        }).then(onSuccess)
      }
    >
      Add Set
    </Button>
  );
}
