import { useMemo } from "react";
import { DEFAULT_IMAGE_DETAIL, ParsedImageDetail } from "./consts";
import { LeadSheetDetailFragment } from "@/gql/graphql";
import { useLeadSheetSection } from "./LeadSheetSectionProvider/context";
import { updateDetail } from "./LeadSheetSectionProvider/reducer";

export function useImageDetail(detail: LeadSheetDetailFragment) {
  const { dispatch } = useLeadSheetSection();
  return useMemo(() => {
    const serialized =
      detail.content.trim() || JSON.stringify(DEFAULT_IMAGE_DETAIL);
    const value = parseAndValidateContent(serialized) as ParsedImageDetail;

    return [
      value,
      (
        newValue:
          | ParsedImageDetail
          | ((oldValue: ParsedImageDetail) => ParsedImageDetail)
      ) => {
        const serialized = JSON.stringify(
          typeof newValue === "function" ? newValue(value) : newValue
        );
        dispatch(
          updateDetail({
            id: detail.id,
            content: serialized,
          })
        );
      },
    ] as const;
  }, [detail.content, detail.id, dispatch]);
}

function parseAndValidateContent(content: string): ParsedImageDetail {
  const parsed = JSON.parse(content) as ParsedImageDetail;
  if (!parsed.url) {
    parsed.url = "";
  }
  if (parsed.width && typeof parsed.width !== "number") {
    delete parsed.width;
  }
  if (parsed.height && typeof parsed.height !== "number") {
    delete parsed.height;
  }
  return parsed;
}
