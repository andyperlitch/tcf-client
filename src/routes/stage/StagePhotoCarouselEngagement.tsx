// import { CodeBlock } from "@/components/CodeBlock";
import { Polaroid } from "@/components/Polaroid";
import "./StagePhotoCarouselEngagement.css";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
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
  const { width, height } = useWindowSize();
  const widthRef = useRef(width);
  const heightRef = useRef(height);

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
              translateX: Math.round(Math.random() * widthRef.current * 0.45),
              translateY: Math.round(
                Math.random() * heightRef.current * 0.1 -
                  heightRef.current * 0.02
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
  }, [data]);

  return (
    <div className="flex h-full w-full flex-stretch items-center">
      {photos.map((photo) => (
        <Polaroid
          key={photo.id}
          className="absolute polaroid-fade-in"
          photoUrl={photo.photoUrl}
          caption={photo.caption}
          height="60vh"
          initialStyle={initialStyle}
          style={{
            opacity: 1,
            transform: `rotate(${photo.rotation}deg) scale(${photo.scale}) translate(${photo.translateX}px, ${photo.translateY}px)`,
          }}
        />
      ))}
    </div>
  );
}
