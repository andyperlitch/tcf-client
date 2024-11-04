// import { CodeBlock } from "@/components/CodeBlock";
import { Polaroid } from "@/components/Polaroid";
import "./StagePhotoCarouselEngagement.css";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import QRCode from "react-qr-code";
import { toFullS3Url } from "@/utils/toFullS3Url";

interface Photo {
  photoUrl: string;
  caption: string;
  rotation: number;
  scale: number;
  translateX: number;
  translateY: number;
  // can't use photoUrl because there will be duplicates
  id: number;
}

const MAX_PHOTOS = 20;
const initialStyle = {
  opacity: 0,
  transform: "scale(3) rotate(0deg) translate(0, 0)",
};

export function StagePhotoCarouselEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const { slug } = useParamsSafe("slug");
  const nextPhotoId = useRef(0);
  const visibleSubmissionId =
    engagement.viewData?.__typename === "PhotoCarouselData"
      ? engagement.viewData.visibleSubmission
      : undefined;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const { data /* , loading, error  */ } = useStageGetSubmissionQuery({
    skip: !visibleSubmissionId,
    variables: { id: visibleSubmissionId! },
  });
  const { width } = useWindowSize();

  useEffect(() => {
    if (data?.submission?.data?.photoUrl) {
      const url = toFullS3Url(data?.submission?.data?.photoUrl);
      const loader = new Image();
      loader.src = url;
      loader.onload = () => {
        setPhotos((prev) => {
          const newPhotos = [
            ...prev,
            {
              photoUrl: url,
              caption: data?.submission?.data?.caption || "",
              rotation: Math.round(Math.random() * 20 - 10),
              scale: 1,
              translateX: Math.round(
                Math.random() * width * 0.35 - width * 0.05
              ),
              translateY: Math.round(
                Math.random() * width * 0.05 - width * 0.035
              ),
              id: nextPhotoId.current++,
            },
          ];
          if (newPhotos.length > MAX_PHOTOS) {
            newPhotos.shift();
          }
          return newPhotos;
        });
      };
    }
  }, [data, width]);

  return (
    <div className="flex h-full w-full items-center">
      <div className="h-full w-1/2 pl-[10vw] pt-[20vh]">
        {photos.map((photo) => (
          <Polaroid
            key={photo.id}
            className="absolute polaroid-fade-in"
            photoUrl={photo.photoUrl}
            caption={photo.caption}
            width="28vw"
            initialStyle={initialStyle}
            style={{
              opacity: 1,
              transform: `rotate(${photo.rotation}deg) scale(${photo.scale}) translate(${photo.translateX}px, ${photo.translateY}px)`,
            }}
          />
        ))}
      </div>
      <div className="flex h-full w-1/2 flex-col items-end justify-end">
        <div
          className={`
            mb-4 mr-4 flex flex-col items-center rounded-lg bg-[#fae1aa] p-4
          `}
        >
          <p
            className={`text-center font-hand text-5xl text-[#894c37]`}
            style={{ width: `${width * 0.15}px` }}
          >
            Only scan this if you're cool
          </p>
          <QRCode
            value={`${window.location.origin}/e/${slug}`}
            size={width * 0.15}
            level="L"
            fgColor="#894c37"
            bgColor="#fae1aa77"
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}
