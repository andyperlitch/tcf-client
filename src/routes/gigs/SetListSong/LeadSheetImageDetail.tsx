import { LeadSheetDetailFragment } from "@/gql/graphql";
import { ParsedImageDetail } from "@/types/leadsheet";
import { toFullS3Url } from "@/utils/toFullS3Url";
import { useMemo } from "react";

const DEFAULT_WIDTH = 300;

export function LeadSheetImageDetail({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const { url, width, height } = useMemo(() => {
    const parsed = JSON.parse(detail.content) as ParsedImageDetail;

    return {
      url: toFullS3Url(parsed.url),
      width:
        parsed.constraintDimension === "width"
          ? parsed.width || DEFAULT_WIDTH
          : undefined,
      height:
        parsed.constraintDimension === "height" ? parsed.height : undefined,
    };
  }, [detail.content]);

  return (
    <div>
      <img src={url} width={width} height={height} />
    </div>
  );
}
