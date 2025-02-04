import { LeadSheetDetailFragment } from "@/gql/graphql";

export function LeadSheetTextDetail({
  detail,
}: {
  detail: LeadSheetDetailFragment;
}) {
  return <div data-name="TEXT_DETAIL">{detail.content}</div>;
}
