import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageSelector } from "./ImageSelector";
import { useEffect, useState } from "react";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { FormErrors } from "./FormErrors";

const formSchema = z.object({
  // title of the choice
  title: z.string().min(1),
  // description of the choice
  description: z.string().optional(),
});

export function CreateVoteForChoiceForm({
  engagementId,
  onCreated,
}: {
  engagementId: number;
  onCreated: () => void;
}) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const { createSubmission, loading, errors, succeeded } = useCreateSubmission({
    engagementId,
    file,
    toData: (url?: string) => ({
      photoUrl: url,
      ...form.getValues(),
    }),
  });

  useEffect(() => {
    if (succeeded) {
      toast({
        variant: "default",
        title: "Submission created",
      });
      form.reset();
      onCreated();
    }
  }, [succeeded, form, toast, onCreated]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createSubmission)}
        className="space-y-8"
      >
        {errors?.length > 0 && <FormErrors errors={errors} />}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <ImageSelector onImageChange={setFile} />
        <Button type="submit" disabled={loading}>
          Create
        </Button>
      </form>
    </Form>
  );
}
