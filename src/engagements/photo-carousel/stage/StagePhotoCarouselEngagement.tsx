// import { CodeBlock } from "@/components/CodeBlock";
import { Polaroid } from "@/components/Polaroid";
import styles from "./StagePhotoCarouselEngagement.module.css";
import {
  PhotoCarouselSubmissionData,
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { toFullS3Url } from "@/utils/toFullS3Url";
import annoyedStyles from "@/styles/Annoyed.module.css";
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
  transform: "scale(3) rotate(0deg) translate(0, 25%)",
};

export function StagePhotoCarouselEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const nextPhotoId = useRef(0);
  const visibleSubmissionId =
    engagement.viewData?.__typename === "PhotoCarouselViewData"
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
    if (data?.submission?.data?.__typename === "PhotoCarouselSubmissionData") {
      const submissionData = data.submission
        .data as PhotoCarouselSubmissionData;
      if (submissionData.photoUrl) {
        const photoUrl = toFullS3Url(submissionData.photoUrl);
        setPhotos((prev) => {
          if (prev.length > 0 && prev[prev.length - 1].photoUrl === photoUrl) {
            return prev;
          }
          const newPhotos = [
            ...prev,
            {
              photoUrl,
              caption: submissionData.caption,
              rotation: Math.round(Math.random() * 20 - 10),
              scale: 1,
              translateX: Math.round(
                Math.random() * widthRef.current * 0.45 -
                  widthRef.current * 0.225
              ),
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
      }
    }
  }, [data]);

  return (
    <div
      data-name="PHOTOS-CONTAINER"
      className={`
        flex h-screen w-full flex-stretch relative items-center justify-center
        overflow-hidden
      `}
    >
      {photos.map((photo) => (
        <Polaroid
          key={photo.id}
          className={`
            absolute

            ${styles.polaroidFadeIn}
          `}
          photoUrl={photo.photoUrl}
          caption={photo.caption}
          width="23vw"
          initialStyle={initialStyle}
          loadedStyle={{
            opacity: 1,
            transform: `rotate(${photo.rotation}deg) scale(${photo.scale}) translate(${photo.translateX}px, ${photo.translateY}px)`,
          }}
        />
      ))}
      {photos.length === 0 && (
        <div
          data-name="PHOTOS-EMPTY"
          className={`
            font-hand text-4xl

            ${annoyedStyles.annoyedShake}
          `}
        >
          Looking for photos...
        </div>
      )}
    </div>
  );
}
