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

// 1. Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.date().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

// Define the form component
export function CreateGigForm({
  onSubmit,
  disableSubmit,
}: {
  onSubmit: (values: FormSchema) => void;
  disableSubmit?: boolean;
}) {
  // 2. Create form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: undefined,
    },
  });

  // 4. Render form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
