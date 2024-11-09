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
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { Button } from "./ui/button";
import { useAdminGenerateImageMutation } from "@/gql/graphql";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const sizes = ["1024x1024", "1792x1024", "1024x1792"] as const;

const formSchema = z.object({
  // title of the choice
  prompt: z.string().min(1),
  // description of the choice
  size: z.enum(sizes),
});

export function GenerateImageForm({
  onImageGenerated,
  onCancel,
}: {
  onImageGenerated?: (uri: string) => void;
  onCancel?: () => void;
}) {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      size: "1024x1024",
    },
  });

  const [adminGenerateImage, { loading }] = useAdminGenerateImageMutation();

  const generateImage = useCallback(
    (data: z.infer<typeof formSchema>) => {
      adminGenerateImage({ variables: { data } })
        .then((res) => {
          if (res.data?.adminGenerateImage) {
            const { uri, error } = res.data.adminGenerateImage;
            if (error) {
              toast({
                variant: "destructive",
                title: "Error generating image",
                description: error,
              });
            } else if (uri) {
              onImageGenerated?.(uri);
            }
          }
        })
        .catch((e: any) => {
          toast({
            variant: "destructive",
            title: "Error generating image",
            description: e.message,
          });
        });
    },
    [adminGenerateImage, onImageGenerated, toast]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(generateImage)}
        className={`space-y-2 rounded-lg bg-black p-2 text-left`}
      >
        <h1 className="text-lg font-bold">Generate Image</h1>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Prompt" {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
