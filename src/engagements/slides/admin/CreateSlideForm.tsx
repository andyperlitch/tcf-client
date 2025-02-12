import { AdminSubmissionFormProps } from "@/engagements/base/EngagementDefinition";
import { SlideForm, SlideFormProps } from "./SlideForm";
import { useAdminCreateSubmission } from "@/hooks/useAdminCreateSubmission";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { SlidesSubmissionData } from "@/gql/graphql";

export function CreateSlideForm({
  engagementId,
  existingSubmissions,
}: AdminSubmissionFormProps) {
  const { createSubmission } = useAdminCreateSubmission<SlidesSubmissionData>();
  const { toast } = useToast();
  const [newKey, setNewKey] = useState(0);

  const handleSubmit = useCallback<SlideFormProps["onSubmit"]>(
    ({ data, uploads }) => {
      createSubmission({
        engagementId,
        data: {
          ...data,
          order: existingSubmissions?.length || 0,
        },
        uploads,
      }).then((result) => {
        if (result && "data" in result && !result.errors?.length) {
          setNewKey((prevKey) => prevKey + 1);
        } else {
          toast({
            title: "Error",
            description:
              "Failed to create slide: " + result?.errors?.join(", "),
            variant: "destructive",
          });
        }
      });
    },
    [createSubmission, engagementId, existingSubmissions, toast]
  );
  return <SlideForm key={newKey} onSubmit={handleSubmit} />;
}
