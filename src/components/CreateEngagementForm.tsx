import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datepicker";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  viewConfig: z.any(),
});

const CREATE_ENGAGEMENT_MUTATION = gql`
  mutation CreateEngagement($eventId: Int!, $input: CreateEngagementInput!) {
    createEngagement(eventId: $eventId, data: $input) {
      id
    }
  }
`;

export function CreateEngagementForm({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  const [createEngagement, { loading, error }] = useMutation(
    CREATE_ENGAGEMENT_MUTATION
  );
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      viewConfig: {},
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    createEngagement({
      variables: {
        eventId,
        input: values,
      },
    }).then((res) => {
      // go to the engagement page
      navigate(`/admin/events/${eventSlug}/${res.data.createEngagement.id}`);
      console.log(res);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        {/* description: */}
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

        <Button type="submit" disabled={loading}>
          Create Event
        </Button>
      </form>
    </Form>
  );
}
