"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useBandCreateGigMutation } from "@/gql/graphql";
import { CreateGigForm, FormSchema } from "./CreateGigForm";
import { GigFragment } from "@/gql/graphql";
import { useState } from "react";

export function CreateGigButton({
  onSuccess,
}: {
  onSuccess: (gig: GigFragment) => void;
}) {
  const [createGig] = useBandCreateGigMutation();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: FormSchema) => {
    setSubmitting(true);
    const result = await createGig({
      variables: {
        data: {
          name: values.name,
          date: values.date,
        },
      },
    });

    if (result.data?.createGig.id) {
      onSuccess(result.data.createGig);
    }
    setSubmitting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" /> New Gig
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Gig</DialogTitle>
          <DialogDescription>Money money money.</DialogDescription>
        </DialogHeader>
        <CreateGigForm onSubmit={onSubmit} disableSubmit={submitting} />
      </DialogContent>
    </Dialog>
  );
}
