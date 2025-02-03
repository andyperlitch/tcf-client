import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBandCreateSongMutation } from "@/gql/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title required"),
  artist: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function NewSongButton() {
  const [open, setOpen] = useState(false);
  const [createSong, { loading: creatingSong }] = useBandCreateSongMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      artist: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    createSong({ variables: { data: values }, refetchQueries: ["bandSongs"] })
      .then((result) => {
        form.reset();
        setOpen(false);
        navigate(`/admin/songs/${result.data?.createSong.id}`);
      })
      .catch(() => {
        toast({
          title: "Failed to create song",
          description: "Please try again.",
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" /> New Song
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Song</DialogTitle>
          <DialogDescription>Sensation!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-col gap-4`}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Song Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={creatingSong} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Artist</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={creatingSong} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={creatingSong}
              className="self-start"
            >
              {creatingSong ? "Creating..." : "Create Song"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
