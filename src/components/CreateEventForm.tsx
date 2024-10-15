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
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  location: z.string().optional(),
});

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(data: $input) {
      id
      name
      location
      date
      description
      slug
      createdAt
    }
  }
`;

export function CreateEventForm() {
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT_MUTATION);
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      date: new Date(),
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    createEvent({
      variables: {
        input: values,
      },
    }).then((res) => {
      // go to the event page
      navigate(`/admin/events/${res.data.createEvent.slug}`);
      console.log(res);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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
        {/* slug: */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Slug</FormLabel>
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
        {/* date: */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        {/* location: */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Location</FormLabel>
              <FormControl>
                <Input {...field} />
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
