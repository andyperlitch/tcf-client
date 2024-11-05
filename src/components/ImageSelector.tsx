import { useImageInput } from "@/hooks/useImagePreview";
import { useRef } from "react";

export function ImageSelector({
  name = "image",
  onImageChange,
}: {
  name?: string;
  onImageChange?: (file: File | null) => void;
}) {
  const { previewSrc, handleFileChange } = useImageInput({ onImageChange });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function choosePhoto() {
    fileInputRef.current?.click();
  }

  return (
    <div>
      {!previewSrc && (
        <div
          onClick={choosePhoto}
          className={`
            rounded-lg border-8 border-dashed border-slate-800 bg-slate-950 p-8
            text-center text-2xl
          `}
        >
          choose photo
        </div>
      )}

      {previewSrc && <img src={previewSrc} width={300} />}
      <form className="hidden" encType="multipart/form-data">
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          name={name}
        />
      </form>
    </div>
  );
}
