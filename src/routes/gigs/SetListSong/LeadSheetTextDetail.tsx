import { LeadSheetDetailFragment } from "@/gql/graphql";
import { Fragment as F } from "react";

export function LeadSheetTextDetail({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  const formattedContent = detail.content.split("\n").map((line, i) => (
    <F key={i}>
      {line}
      {i < detail.content.split("\n").length - 1 && <br />}
    </F>
  ));

  return <div data-name="TEXT_DETAIL">{formattedContent}</div>;
}
