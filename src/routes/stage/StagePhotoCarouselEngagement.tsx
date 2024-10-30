// import { CodeBlock } from "@/components/CodeBlock";
import { Polaroid } from "@/components/Polaroid";
import "./StagePhotoCarouselEngagement.css";
import {
  StageEngagementFragment,
  useStageGetSubmissionQuery,
} from "@/gql/graphql";
import { useEffect, useState } from "react";

export function StagePhotoCarouselEngagement({
  engagement,
}: {
  engagement: StageEngagementFragment;
}) {
  const visibleSubmissionId = engagement.viewData?.visibleSubmission;
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [fadeClass, setFadeClass] = useState<string>("polaroid-fade-in");
  const { data /* , loading, error  */ } = useStageGetSubmissionQuery({
    skip: !visibleSubmissionId,
    variables: { id: visibleSubmissionId },
  });

  useEffect(() => {
    if (data?.submission?.data?.photoUrl) {
      const url = `https://thecasualfunk.s3.us-west-1.amazonaws.com/${data?.submission?.data?.photoUrl}`;
      const loader = new Image();
      loader.src = url;
      setFadeClass("polaroid-fade-out");
      setRotation(Math.round(Math.random() * 20 - 10));
      setScale(2);
      loader.onload = () => {
        setPhotoUrl(url);
        setCaption(data?.submission?.data?.caption || "");
        setFadeClass("polaroid-fade-in");
        setScale(1);
      };
    }
  }, [data]);

  return (
    <div className="flex h-full w-full items-center pb-12 pl-[10vw] pt-24">
      <Polaroid
        className={fadeClass}
        photoUrl={photoUrl}
        caption={caption}
        width="30vw"
        style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
      />
    </div>
  );
}
