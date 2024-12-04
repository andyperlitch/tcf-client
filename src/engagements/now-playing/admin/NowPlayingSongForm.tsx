import {
  AdminSubmissionFragment,
  NowPlayingSubmissionData,
} from "@/gql/graphql";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/image-input";

const formSchema = z.object({
  songTitle: z.string().min(1),
  songArtist: z.string(),
  songLyrics: z.string(),
  songNotes: z.string(),
  visualizationType: z.string(),
  songAlbumArt: z.string().url().optional().nullable(),
  songAlbumArtFile: z.instanceof(File).optional().nullable(),
});

/**
 * Form to add or edit a song.
 * If editing an existing song, pass the song object.
 */
export function NowPlayingSongForm({
  onSubmit,
  song,
}: {
  /**
   * Callback for when the form is submitted.
   */
  onSubmit: (data: {
    data: Omit<z.infer<typeof formSchema>, "songAlbumArtFile">;
    uploads: {
      field: string;
      file: File | null | undefined;
      type: "image";
    }[];
  }) => void;
  /**
   * If this is passed, the form will be in "update" mode.
   */
  song?: Omit<AdminSubmissionFragment, "data"> & {
    data: NowPlayingSubmissionData;
  };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songTitle: song?.data.songTitle ?? "",
      songArtist: song?.data.songArtist ?? "",
      songLyrics: song?.data.songLyrics ?? "",
      songNotes: song?.data.songNotes ?? "",
      visualizationType: song?.data.visualizationType ?? "default",
      songAlbumArt: song?.data.songAlbumArt ?? null,
    },
  });

  /**
   * Extracts the songAlbumArtFile from the data, then calls onSubmit with
   * the rest of the data and the songAlbumArtFile as an upload.
   */
  const handleSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const { songAlbumArtFile, ...rest } = data;
      onSubmit({
        data: rest,
        uploads: [
          {
            field: "songAlbumArt",
            file: songAlbumArtFile,
            type: "image",
          },
        ],
      });
    },
    [onSubmit]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="flex flex-col gap-2 p-4">
          <h3 className="text-lg font-semibold">Add a Song</h3>
          <FormField
            control={form.control}
            name="songTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Song Title" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="songArtist"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Artist</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Song Artist" />
                </FormControl>
              </FormItem>
            )}
          />
          {/* songLyrics (textarea) */}
          <FormField
            control={form.control}
            name="songLyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Lyrics</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Song Lyrics (will be displayed)"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* songNotes (textarea) */}
          <FormField
            control={form.control}
            name="songNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Song Notes (will be displayed)"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* visualizationType (select) */}
          <FormField
            control={form.control}
            name="visualizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Visualization Type</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visualization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="default">Default</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {/* songAlbumArt (file preview) */}
          <FormField
            control={form.control}
            name="songAlbumArtFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Album Art</FormLabel>
                <FormControl>
                  <ImageInput
                    {...field}
                    currentImageUrl={song?.data.songAlbumArt}
                    onCurrentImageClear={() => {
                      form.setValue("songAlbumArt", null);
                    }}
                    width={200}
                    height={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-start">
            Submit
          </Button>
        </Card>
      </form>
    </Form>
  );
}
