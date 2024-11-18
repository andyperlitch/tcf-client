import { ImageSelector } from "@/components/ImageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminSubmissionFragment } from "@/gql/graphql";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { useState } from "react";

export function CreateSlideForm({
  engagementId,
  onCreated,
  existingSubmissions = [],
}: {
  engagementId: number;
  existingSubmissions?: AdminSubmissionFragment[];
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const {
    createSubmission: createSlide,
    loading,
    errors,
  } = useCreateSubmission({
    engagementId,
    file,
    toData: (url) => {
      const otherOrders = existingSubmissions.map((s) =>
        s.data.__typename === "SlidesSubmissionData" ? s.data.order : 0
      );
      const order = Math.max(...otherOrders, 0) + 1;
      return {
        title,
        content,
        optionalImageUrl: url,
        order,
      };
    },
    onSuccess: () => {
      setTitle("");
      setContent("");
      setFile(null);
      onCreated();
    },
  });

  async function handleSubmit() {
    await createSlide();
  }

  return (
    <div data-name="CREATE-SLIDE-FORM" className="flex flex-col space-y-2">
      {errors.map((e) => (
        <div key={e} className="text-red-500">
          {e}
        </div>
      ))}
      <div data-name="CREATE-SLIDE-FORM-LEFT" className="flex space-x-2">
        <div className="flex flex-col space-y-2">
          <Input
            name="title"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            name="content"
            placeholder="Content (markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <ImageSelector onImageChange={setFile} />
        </div>
      </div>
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!title || !content || loading}
      >
        {loading ? "Creating..." : "Create"}
      </Button>
    </div>
  );
}
