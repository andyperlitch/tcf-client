import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { Upload } from "@/hooks/useCreateSubmission";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/image-input";
import { AdminSubmissionFragment, SlidesSubmissionData } from "@/gql/graphql";

const formSchema = z.object({
  // title of the slide
  title: z.string().min(1),
  // content of the slide
  content: z.string().min(1),
  // optional image url
  optionalImageUrl: z.string().url().optional().nullable(),
  // optional image file
  optionalImageFile: z.instanceof(File).optional().nullable(),
});

export interface SlideFormProps {
  /**
   * Callback for when the form is submitted.
   */
  onSubmit: (data: {
    data: Omit<z.infer<typeof formSchema>, "optionalImageFile">;
    uploads: Upload<SlidesSubmissionData>[];
  }) => void;
  /**
   * If this is passed, the form will be in "update" mode.
   */
  submission?: Omit<AdminSubmissionFragment, "data"> & {
    data: SlidesSubmissionData;
  };
}

export function SlideForm({ submission: slide, onSubmit }: SlideFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      optionalImageUrl: null,
    },
  });

  // 2. Define a submit handler.
  /**
   * Extracts the songAlbumArtFile from the data, then calls onSubmit with
   * the rest of the data and the songAlbumArtFile as an upload.
   */
  const handleSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const { optionalImageFile, ...rest } = data;
      onSubmit({
        data: rest,
        uploads: optionalImageFile
          ? [
              {
                field: "optionalImageUrl",
                file: optionalImageFile,
                type: "image",
              },
            ]
          : [],
      });
    },
    [onSubmit]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex flex-col gap-2`}
      >
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Content" {...field} />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          {/* optionalImageFile (file preview) */}
          <FormField
            control={form.control}
            name="optionalImageFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageInput
                    {...field}
                    currentImageUrl={slide?.data.optionalImageUrl}
                    onCurrentImageClear={() => {
                      form.setValue("optionalImageUrl", null);
                    }}
                    width={200}
                    height={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
