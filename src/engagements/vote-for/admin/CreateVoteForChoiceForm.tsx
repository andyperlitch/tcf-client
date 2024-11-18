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
import { ImageSelector } from "@/components/ImageSelector";
import { useEffect, useState } from "react";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ColorPicker";

const formSchema = z.object({
  // title of the choice
  title: z.string().min(1),
  // description of the choice
  description: z.string().optional(),
  // color of the choice
  color: z.string(),
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
  const [resetKey, setResetKey] = useState(0);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "#000000",
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  const { createSubmission, loading, errors } = useCreateSubmission({
    engagementId,
    file,
    toData: (url?: string) => ({
      optionalImageUrl: url,
      ...form.getValues(),
    }),
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Submission created",
      });
      form.reset();
      setResetKey((resetKey) => resetKey + 1);
      onCreated();
    },
  });

  useEffect(() => {
    if (errors?.length > 0) {
      toast({
        variant: "destructive",
        title: "Error creating submission",
      });
    }
  }, [errors, toast]);

  return (
    <Form {...form}>
      <div className="flex flex-col space-y-1">
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex-0">
                <FormControl>
                  <ColorPicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Label" {...field} />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
      </div>
      <div className="flex">
        <ImageSelector
          key={resetKey}
          onImageChange={setFile}
          allowGenerate
          width={100}
        />
      </div>

      <div>
        <Button type="button" onClick={createSubmission} disabled={loading}>
          Create
        </Button>
      </div>
    </Form>
  );
}
