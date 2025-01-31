import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { useAdminGetEventsQuery } from "@/gql/graphql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  eventId: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  date: z.date().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Create a new gig form
 */
export function CreateGigForm({
  onSubmit,
  disableSubmit,
}: {
  onSubmit: (values: FormSchema) => void;
  disableSubmit?: boolean;
}) {
  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useAdminGetEventsQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: undefined,
      name: "",
      date: undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "eventId" && value.eventId) {
        const selectedEvent = eventsData?.events.find(
          (event) => event.id === value.eventId
        );
        if (selectedEvent) {
          form.setValue("name", selectedEvent.name);
          form.setValue("date", new Date(selectedEvent.date));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, eventsData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="eventId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Event</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
                disabled={eventsLoading || !!eventsError}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        eventsLoading
                          ? "Loading..."
                          : eventsError
                          ? "Error loading events"
                          : "Select an event"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventsData?.events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {eventsError && <FormMessage>Failed to load events</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={disableSubmit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Date</FormLabel>
              <FormControl>
                <DatePicker {...field} disabled={disableSubmit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disableSubmit}>
          Create Gig
        </Button>
      </form>
    </Form>
  );
}
