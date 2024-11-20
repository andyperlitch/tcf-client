import { useSwipeable } from "react-swipeable";
import { useEffect } from "react";
import { useState } from "react";
import { scaleLinear } from "d3-scale";
import { FanEngagementFragment } from "@/gql/graphql";
import { useImageInput } from "@/hooks/useImagePreview";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getRandomCaption } from "./getRandomCaption";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";
import { Nice } from "@/components/Nice";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";

import styles from "@/styles/SwipeUp.module.css";

const xToRotation = scaleLinear([-50, 50], [-5, 5]);

export function NewPhotoForm({
  engagement,
  onSuccess,
}: {
  engagement: FanEngagementFragment;
  onSuccess?: () => void;
}) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { previewSrc, handleFileChange, file } = useImageInput({
    onImageChange: () => {
      captionInputRef.current?.focus();
    },
  });
  const captionInputRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState(getRandomCaption());
  const { toast } = useToast();

  const polaroidRef = useRef<HTMLDivElement>(null);

  function choosePhoto() {
    photoInputRef.current?.click();
  }

  const velocityRef = useRef(0);
  const deltaYRef = useRef(0);
  const { createSubmission, loading, errors, succeeded } = useCreateSubmission({
    engagementId: engagement.id,
    file,
    toData: (url?: string) => ({
      photoUrl: url,
      caption,
    }),
  });

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
          createSubmission();
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
      data-name="NEW_PHOTO_FORM"
      className={`flex h-screen w-screen flex-col items-center justify-center`}
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
      {!previewSrc && (
        <p
          className={cn("text-center font-hand text-3xl transition-opacity", {
            "opacity-0": loading || succeeded,
          })}
        >
          {engagement.description || "Caption contest!"}
        </p>
      )}

      {/* polaroid */}
      <div data-name="POLAROID" className="relative z-10" ref={polaroidRef}>
        <div
          data-name="POLAROID_SWIPER"
          className="relative z-10 bg-slate-50 p-4"
          {...(previewSrc ? swipeHandlers : {})}
        >
          <div data-name="PHOTO_FRAME" className="relative">
            {previewSrc ? (
              <>
                <img className="w-[70vw]" src={previewSrc} alt="preview" />
                {/* swipe-to-send instructions */}
                {previewSrc && (
                  <div
                    data-name="SWIPE_UP_TO_SEND"
                    // className={`
                    //   absolute left-1/2 top-1/2 flex -translate-x-1/2
                    //   -translate-y-1/2 flex-col items-center justify-center
                    //   text-center

                    //   ${styles.matchOpacityToSwipeUp}
                    // `}
                    className={`
                      absolute bottom-0 left-0 right-0 top-0 flex flex-col
                      items-center justify-center bg-[#FFFFFF99] text-center

                      ${styles.matchOpacityToSwipeUp}
                    `}
                  >
                    <div
                      className={`
                        text-5xl

                        ${styles.swipeUp}
                      `}
                    >
                      👆
                    </div>
                    <div
                      // className={`
                      //   whitespace-nowrap rounded-lg bg-white px-2 py-1
                      //   font-hand text-3xl font-bold text-background
                      // `}
                      className={`
                        mt-4 whitespace-nowrap font-hand text-4xl font-bold
                        text-background
                      `}
                    >
                      SWIPE UP TO SEND
                    </div>
                  </div>
                )}
              </>
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
                <div>1. Take a photo</div>
                <div>2. Caption it</div>
                <div>3. Swipe it 👆</div>
              </div>
            )}
          </div>

          {/* caption input */}
          <div className="mt-2 text-center text-sm text-muted-foreground">
            caption
          </div>
          <div className="flex items-center gap-2">
            <Textarea
              ref={captionInputRef}
              className={`
                grow border-slate-200 font-hand text-2xl text-black shadow-inner
              `}
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="informational"
                onClick={() => setCaption(getRandomCaption())}
              >
                {/* <ReloadIcon className="h-4 w-4" /> */}
                Random
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setCaption("")}
              >
                {/* <CircleBackslashIcon className="h-4 w-4" /> */}
                Clear
              </Button>
            </div>
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
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
