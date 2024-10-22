import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { EngagementDefinitions, ViewType } from "@/consts/engagements";
import { useState } from "react";
import { useAdminCreateEngagementMutation } from "@/gql/graphql";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const engagementTypeDefs = [ViewType.VoteFor, ViewType.PhotoCarousel].map(
  (type) => EngagementDefinitions[type]
);

export function CreateEngagementForm({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  const [createEngagement, { loading /* , error */ }] =
    useAdminCreateEngagementMutation();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>(
    ViewType.PhotoCarousel
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const viewConfig =
      EngagementDefinitions[selectedType as ViewType].defaultConfig();

    createEngagement({
      variables: {
        eventId,
        input: { ...values, viewConfig },
      },
    }).then((res) => {
      // go to the engagement page
      navigate(
        `/admin/events/${eventSlug}/engagements/${res.data?.createEngagement.id}`
      );
      console.log(res);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
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
        {/* type */}
        <div className="space-y-2">
          <Label>View Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Engagement Types</SelectLabel>
                {engagementTypeDefs.map((typeDef) => (
                  <SelectItem key={typeDef.type} value={typeDef.type}>
                    {typeDef.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          Create Engagement
        </Button>
      </form>
    </Form>
  );
}
