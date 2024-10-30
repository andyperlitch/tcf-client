import { useEffect } from "react";
import { useState } from "react";
import { FanEngagementFragment } from "@/gql/graphql";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useRef } from "react";
import { useFanPhotoCarouselSubmit } from "@/hooks/useFanPhotoCarouselSubmit";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function FanPhotoCarouselEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const { previewSrc, handleFileChange } = useImagePreview();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const captionInputRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [file, setFile] = useState<File>();

  function choosePhoto() {
    photoInputRef.current?.click();
  }

  // listen for photo input change
  useEffect(() => {
    photoInputRef.current?.addEventListener("change", handlePhotoChange);
  }, []);

  function handlePhotoChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    setMimeType(file?.type || "");
    setFile(file);
    captionInputRef.current?.focus();
  }

  const { submitPhoto, uploadProgress, errors, loading } =
    useFanPhotoCarouselSubmit({
      engagementId: engagement.id,
      mimeType: mimeType,
      file,
      caption,
    });

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center space-y-4
      `}
    >
      <p>{engagement.description || "(It'll show up on the big screen)"}</p>
      <div className="polaroid w-3/4 bg-white p-4">
        {previewSrc ? (
          <img src={previewSrc} alt="preview" />
        ) : (
          <div
            data-name="photo-input-click-area"
            onClick={choosePhoto}
            className={`
              flex min-h-[300px] w-full flex-col items-center justify-center
              border-8 border-dashed border-[#FFFFFF33] bg-slate-600 text-center
              text-2xl font-bold text-[#FFFFFF33]
            `}
          >
            <CameraIcon className="h-16 w-16" />
            <div>Share a photo</div>
          </div>
        )}
        <Textarea
          ref={captionInputRef}
          className="border-0 font-hand text-2xl text-black shadow-none"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <Button
        variant="default"
        disabled={!previewSrc || loading}
        onClick={submitPhoto}
      >
        {uploadProgress
          ? `uploading (${Math.round(uploadProgress)}%)`
          : "submit"}
      </Button>

      {errors && <div className="text-red-500">{errors.join(", ")}</div>}

      <form className="hidden">
        <input
          ref={photoInputRef}
          type="file"
          name="photo"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
