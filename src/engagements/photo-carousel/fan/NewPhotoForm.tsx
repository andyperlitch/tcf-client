import { useSwipeable } from "react-swipeable";
import { useEffect } from "react";
import { useState } from "react";
import { scaleLinear } from "d3";
import { FanEngagementFragment, PhotoCarouselViewConfig } from "@/gql/graphql";
import { useImageInput } from "@/hooks/useImagePreview";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, CameraIcon, InputIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  const viewConfig = engagement.viewConfig as PhotoCarouselViewConfig;
  const [caption, setCaption] = useState(getRandomCaption());
  const [sharingPermissionGranted, setSharingPermissionGranted] = useState<
    boolean | "indeterminate"
  >(viewConfig.askSharePermission ? true : false); // if asking permission, default to true
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
      sharingPermissionGranted,
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
      // height set to 85vh to account for the navigation bar in mobile browsers
      className={`
        flex h-[85vh] w-screen flex-col items-center justify-center space-y-4
      `}
    >
      {/* description */}
      {!previewSrc && (
        <p
          className={cn(
            "pt-4 text-center font-hand text-3xl transition-opacity",
            {
              "opacity-0": loading || succeeded,
            }
          )}
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
                  gap-4 border-8 border-dashed border-[#FFFFFF33] bg-slate-600
                  text-center text-2xl font-bold text-[#FFFFFF33]
                `}
              >
                <div className="flex gap-2">
                  <CameraIcon className="h-8 w-8" /> Take a photo
                </div>

                <div className="flex gap-2">
                  <InputIcon className="h-8 w-8" /> Caption it
                </div>

                <div className="flex gap-2">
                  <ArrowUpIcon className="h-8 w-8" /> Swipe it 👆
                </div>
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
          {(viewConfig.askSharePermission || viewConfig.sharePrompt) && (
            <div
              data-name="SHARE_PROMPT"
              className={`mt-2 flex w-[70vw] justify-between p-2`}
            >
              <div
                className={`
                  ${viewConfig.askSharePermission ? "w-2/3" : "w-full"}

                  flex-grow-0 text-sm text-muted-foreground
                `}
              >
                {viewConfig.sharePrompt}
              </div>
              {viewConfig.askSharePermission && (
                <div className="flex flex-grow-0 items-center gap-2">
                  <label
                    className={`
                      flex items-center gap-2 font-bold text-background
                    `}
                  >
                    Yes{" "}
                    <Checkbox
                      className="flex-0"
                      checked={sharingPermissionGranted}
                      onCheckedChange={setSharingPermissionGranted}
                    />
                  </label>
                </div>
              )}
            </div>
          )}
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
