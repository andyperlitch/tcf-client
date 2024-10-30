// import { CodeBlock } from "@/components/CodeBlock";
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
        setPhotoUrl(url);
      };
    }
  }, [data]);

  return (
    <div>
      <h1>{engagement.title}</h1>
      {/* <CodeBlock json={engagement.viewData} />
      {visibleSubmission && <CodeBlock json={visibleSubmission} />} */}
      {photoUrl && <img width="300" src={photoUrl} />}
    </div>
  );
}
