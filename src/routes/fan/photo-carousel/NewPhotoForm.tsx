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
import { cn } from "@/lib/utils";
import { Loader } from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { Nice } from "@/components/Nice";
const xToRotation = scaleLinear([-50, 50], [-5, 5]);

export function NewPhotoForm({
  engagement,
  onSuccess,
}: {
  engagement: FanEngagementFragment;
  onSuccess?: () => void;
}) {
  const { previewSrc, handleFileChange } = useImagePreview();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const captionInputRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState(getRandomCaption());
  const [mimeType, setMimeType] = useState("");
  const [file, setFile] = useState<File>();
  const { toast } = useToast();

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
  const { submitPhoto, loading, errors, succeeded } = useFanPhotoCarouselSubmit(
    {
      engagementId: engagement.id,
      mimeType: mimeType,
      file,
      caption,
    }
  );

  // ERROR HANDLING
  useEffect(() => {
    if (errors && errors.length > 0 && polaroidRef.current) {
      polaroidRef.current.classList.add("transition-transform");
      polaroidRef.current.style.transform = `translateX(0px) translateY(0px)`;
      toast({
        title: "🤯 Uh oh, something went wrong...",
        description: "Try again in a sec",
        variant: "destructive",
      });
      setTimeout(() => {
        if (polaroidRef.current) {
          // must be removed for dragging/swiping to work
          polaroidRef.current.classList.remove("transition-transform");
        }
      }, 400);
    }
  }, [errors, toast]);

  // SWIPE HANDLING
  const swipeHandlers = useSwipeable({
    preventScrollOnSwipe: true,
    onTouchEndOrOnMouseUp: () => {
      if (polaroidRef.current) {
        polaroidRef.current.classList.add("transition-transform");
        if (velocityRef.current < 0.5 && deltaYRef.current < 100) {
          polaroidRef.current.style.transform = `translateX(0px) translateY(0px)`;
          setTimeout(() => {
            if (polaroidRef.current) {
              // must be removed for dragging/swiping to work
              polaroidRef.current.classList.remove("transition-transform");
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
      <p
        className={cn("text-center font-hand text-3xl transition-opacity", {
          "opacity-0": loading || succeeded,
        })}
      >
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
      <div className="relative z-10" ref={polaroidRef}>
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

      {/* loading */}
      {loading && (
        <Loader
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 and -translate-y-1/2
          `}
        />
      )}

      {/* success message */}
      {succeeded && <Nice onAnimationEnd={onSuccess} />}

      <form
        className="hidden"
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
      >
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
