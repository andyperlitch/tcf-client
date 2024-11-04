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
import { EngagementDefinitions } from "@/consts/engagements";
import { useState } from "react";
import {
  AdminGetEngagementsDocument,
  AdminGetEngagementsQuery,
  AdminGetEngagementsQueryVariables,
  useAdminCreateEngagementMutation,
  EngagementType,
} from "@/gql/graphql";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const engagementTypeDefs = [
  EngagementType.VoteFor,
  EngagementType.PhotoCarousel,
].map((type) => EngagementDefinitions[type]);

export function CreateEngagementForm({
  eventId,
  eventSlug,
}: {
  eventId: number;
  eventSlug: string;
}) {
  const [createEngagement, { loading /* , error */ }] =
    useAdminCreateEngagementMutation({
      update(cache, { data }) {
        const existingEngagements = cache.readQuery<
          AdminGetEngagementsQuery,
          AdminGetEngagementsQueryVariables
        >({
          query: AdminGetEngagementsDocument,
          variables: { eventId },
        });
        if (existingEngagements?.engagements) {
          cache.writeQuery({
            query: AdminGetEngagementsDocument,
            data: {
              ...existingEngagements,
              engagements: [
                ...existingEngagements.engagements,
                data?.createEngagement,
              ],
            },
            variables: { eventId },
          });
        }
      },
    });

  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>(
    EngagementType.PhotoCarousel
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
    const def = EngagementDefinitions[selectedType as EngagementType];
    const config = def.defaultConfig();
    const data = def.initialData(config as any);

    createEngagement({
      variables: {
        eventId,
        input: { ...values, config, data },
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
