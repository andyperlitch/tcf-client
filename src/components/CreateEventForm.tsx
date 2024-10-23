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
import { CreateEventInput, useAdminCreateEventMutation } from "@/gql/graphql";
import { WithoutNull } from "@/types/common";

const formSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  location: z.string().optional(),
});

type CreateEventFormInput = WithoutNull<CreateEventInput>;

export function CreateEventForm() {
  const [createEvent, { loading, error }] = useAdminCreateEventMutation();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<CreateEventFormInput>({
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
  function onSubmit(values: CreateEventFormInput) {
    createEvent({
      variables: {
        input: values,
      },
    }).then((res) => {
      if (!res?.data?.createEvent.slug) {
        throw new Error("createEvent mutation did not return expected format");
      }

      // go to the event page
      navigate(`/admin/events/${res.data.createEvent.slug}`);
    });
  }

  return (
    <Form {...form}>
      {error && <p className="text-red-500">{error.message}</p>}
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
