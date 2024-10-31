// import { CodeBlock } from "@/components/CodeBlock";
import { Polaroid } from "@/components/Polaroid";
import "./StagePhotoCarouselEngagement.css";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";

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

const MAX_PHOTOS = 15;
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
  const visibleSubmissionId = engagement.viewData?.visibleSubmission;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { data /* , loading, error  */ } = useStageGetSubmissionQuery({
    skip: !visibleSubmissionId,
    variables: { id: visibleSubmissionId },
  });

  useEffect(() => {
    if (data?.submission?.data?.photoUrl) {
      const url = `https://thecasualfunk.s3.us-west-1.amazonaws.com/${data?.submission?.data?.photoUrl}`;
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
              translateX: Math.round(Math.random() * 100 - 50),
              translateY: Math.round(Math.random() * 50 - 25),
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
    <div className="flex h-full w-full items-center pb-12 pl-[10vw] pt-24">
      {photos.map((photo) => (
        <Polaroid
          key={photo.id}
          className="absolute polaroid-fade-in"
          photoUrl={photo.photoUrl}
          caption={photo.caption}
          width="30vw"
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
