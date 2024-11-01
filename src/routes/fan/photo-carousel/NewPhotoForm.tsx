import { useSwipeable } from "react-swipeable";
import { useEffect } from "react";
import { useState } from "react";
import { scaleLinear } from "d3-scale";
import { FanEngagementFragment } from "@/gql/graphql";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useRef } from "react";
import { useFanPhotoCarouselSubmit } from "@/hooks/useFanPhotoCarouselSubmit";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getRandomCaption } from "./getRandomCaption";

const xToRotation = scaleLinear([-50, 50], [-5, 5]);

export function NewPhotoForm({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const { previewSrc, handleFileChange } = useImagePreview();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const captionInputRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState(getRandomCaption());
  const [mimeType, setMimeType] = useState("");
  const [file, setFile] = useState<File>();
  const polaroidRef = useRef<HTMLDivElement>(null);

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

  const velocityRef = useRef(0);
  const deltaYRef = useRef(0);
  const { submitPhoto, uploadProgress, errors, loading } =
    useFanPhotoCarouselSubmit({
      engagementId: engagement.id,
      mimeType: mimeType,
      file,
      caption,
    });

  const swipeHandlers = useSwipeable({
    preventScrollOnSwipe: true,
    onTouchEndOrOnMouseUp: () => {
      if (polaroidRef.current) {
        polaroidRef.current.classList.add("transition-transform");
        if (velocityRef.current < 0.5 && deltaYRef.current < 100) {
          polaroidRef.current.style.transform = `translateX(0px) translateY(0px)`;
          setTimeout(() => {
            if (polaroidRef.current) {
              polaroidRef.current?.classList.remove("transition-transform");
            }
          }, 400);
        } else {
          polaroidRef.current.style.transform = `translateY(-200vh)`;
          submitPhoto();
        }
      }
    },
    onSwiping: (eventData) => {
      if (polaroidRef.current) {
        velocityRef.current = eventData.velocity;
        deltaYRef.current = eventData.deltaY;
        polaroidRef.current.style.transform = `rotate(${xToRotation(
          eventData.deltaX
        )}deg) translateX(${eventData.deltaX}px) translateY(${
          eventData.deltaY
        }px)`;
      }
    },
  });

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center space-y-4
      `}
    >
      {/* title */}
      <h1
        className={`
          ${previewSrc ? "opacity-0" : "opacity-100"}

          absolute left-0 top-0 mt-4 h-10 w-full
          bg-[url('/funksgiving-fan-title.png')] bg-contain bg-center
          bg-no-repeat -indent-[1000px] text-4xl font-bold
        `}
      >
        Funksgiving
      </h1>
      {/* subtitle */}
      <p className="text-center font-hand text-3xl">
        {previewSrc ? (
          <>
            👆
            <br />
            Swipe up to send ittt
          </>
        ) : (
          engagement.description || "Caption contest!"
        )}
      </p>

      {/* polaroid */}
      <div className="" ref={polaroidRef}>
        <div
          className="polaroid relative z-10 bg-white p-4"
          {...(previewSrc ? swipeHandlers : {})}
        >
          {previewSrc ? (
            <img className="w-[70vw]" src={previewSrc} alt="preview" />
          ) : (
            <div
              data-name="photo-input-click-area"
              onClick={choosePhoto}
              className={`
                flex h-[90vw] w-[70vw] flex-col items-center justify-center
                border-8 border-dashed border-[#FFFFFF33] bg-slate-600
                text-center text-2xl font-bold text-[#FFFFFF33]
              `}
            >
              <CameraIcon className="h-16 w-16" />
              <div>Share a photo</div>
            </div>
          )}
          {/* caption input */}
          <div className="mt-2 flex items-center gap-2">
            <Textarea
              ref={captionInputRef}
              className={`
                grow border border-gray-50 font-hand text-2xl text-black
                shadow-none
              `}
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button
              variant="default"
              onClick={() => setCaption(getRandomCaption())}
            >
              <ReloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

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
