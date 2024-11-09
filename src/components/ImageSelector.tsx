import { useImageInput } from "@/hooks/useImagePreview";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { GenerateImageForm } from "./GenerateImageForm";
import { imageUriToFile } from "@/utils/imageUriToFile";

export function ImageSelector({
  name = "image",
  onImageChange,
  width = 200,
  allowGenerate = false,
}: {
  name?: string;
  onImageChange?: (file: File | null) => void;
  width?: number;
  allowGenerate?: boolean;
}) {
  const [mode, setMode] = useState<"choose" | "generate">("choose");
  const { previewSrc, handleFileChange, setPreviewSrc, setFile } =
    useImageInput({ onImageChange });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function choosePhoto() {
    fileInputRef.current?.click();
  }

  function switchToGenerate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setMode("generate");
  }

  function onImageGenerated(uri: string) {
    setPreviewSrc(uri);
    const file = imageUriToFile(uri, "image.png");
    setFile(file);
    setMode("choose");
  }

  return (
    <div data-name="IMAGE-SELECTOR">
      {!previewSrc && (
        <div
          className={`
            flex flex-col items-center justify-center space-y-2 text-center
            text-2xl
          `}
        >
          {mode === "choose" && (
            <>
              <div>
                <Button onClick={choosePhoto}>choose photo</Button>
              </div>
              {allowGenerate && (
                <>
                  <div className="text-sm text-muted-foreground">or</div>
                  <div className="">
                    <Button onClick={switchToGenerate} variant="ghost">
                      generate one
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
          {mode === "generate" && (
            <div data-name="GENERATE-IMAGE-FORM">
              <GenerateImageForm
                onImageGenerated={onImageGenerated}
                onCancel={() => setMode("choose")}
              />
            </div>
          )}
        </div>
      )}

      {previewSrc && (
        <img
          className="rounded-full border-4 border-white"
          src={previewSrc}
          width={width}
        />
      )}
      <input
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        type="file"
        name={name}
      />
    </div>
  );
}
