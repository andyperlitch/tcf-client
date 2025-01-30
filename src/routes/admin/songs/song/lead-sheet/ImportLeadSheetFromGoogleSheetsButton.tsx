import { v4 as uuid } from "uuid";
import {
  CreateLeadSheetSectionInput,
  LeadSheetDetailInput,
  LeadSheetDetailType,
  useAdminCreatePresignedUrlMutation,
  useBandCreateLeadSheetMutation,
  useBandCreateLeadSheetSectionMutation,
} from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { useLeadSheetHtml } from "@/hooks/useLeadSheetHtml";
import { useCallback, useMemo, useState } from "react";
import { uploadFile } from "@/utils/uploadFile";
import { DEFAULT_IMAGE_DETAIL, ParsedImageDetail } from "./consts";

export function ImportLeadSheetFromGoogleSheetsButton({
  songId,
  leadSheetUrl,
  tooltip,
  disabled,
  className,
  onSuccess,
}: {
  songId: number;
  leadSheetUrl: string;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
  onSuccess?: () => void;
}) {
  const performImport = useSyncLeadSheet({ url: leadSheetUrl, songId });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variant="informational"
      disabled={isLoading || disabled}
      tooltip={tooltip}
      className={className}
      onClick={async () => {
        setIsLoading(true);
        await performImport();
        setIsLoading(false);
        onSuccess?.();
      }}
    >
      Import Lead Sheet from Google Sheets
    </Button>
  );
}

function useSyncLeadSheet({ url, songId }: { url: string; songId: number }) {
  const { html, loading: htmlLoading } = useLeadSheetHtml({ url });

  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();
  const [createLeadSheet] = useBandCreateLeadSheetMutation();
  const [createLeadSheetSection] = useBandCreateLeadSheetSectionMutation();

  // get parsed html
  const doc = useMemo(() => {
    if (htmlLoading) return null;
    else if (!html) return null;
    return new DOMParser().parseFromString(html, "text/html");
  }, [html, htmlLoading]);

  // sync lead sheet
  return useCallback(async () => {
    if (!doc) return null;
    // loop through <tr> elements in the table
    const trs = doc.querySelectorAll("table tr");
    const trPromises = Array.from(trs).map(async (tr) => {
      // create the input object
      const leadSheetSectionInput: CreateLeadSheetSectionInput = {};

      // select first <td>
      const headerCell = tr.querySelector("td");
      if (!headerCell) return;

      // the h3 contains the `name`
      const name = headerCell.querySelector("h3")?.textContent;
      if (!name) return;
      leadSheetSectionInput.name = name;

      // the p.lyric contains the `lyricHint`
      const lyricHint = headerCell.querySelector("p.lyric")?.textContent;
      if (lyricHint) leadSheetSectionInput.lyricHint = lyricHint;

      // the span.leadSheetRecordingTimestamp contains the `timeCode`
      const timeCode = headerCell.querySelector(
        "span.leadSheetRecordingTimestamp"
      )?.textContent;
      if (timeCode) leadSheetSectionInput.timeCode = timeCode;

      // select second <td>
      const lengthCell = tr.querySelector("td:nth-child(2)");
      if (!lengthCell) return;

      // all of the td's text content is the `barLength`
      const barLength = lengthCell.textContent;
      if (barLength) leadSheetSectionInput.barLength = barLength.trim();

      // select third <td>
      const detailsCell = tr.querySelector("td:nth-child(3)");
      if (!detailsCell) return;

      const details: LeadSheetDetailInput[] = [];

      // iterate through all children of the detailsCell
      const promises = Array.from(detailsCell.childNodes).map(async (child) => {
        // should all be in p tags
        if (child.nodeType === 1) {
          const p = child as HTMLParagraphElement;

          // if the p tag has the class "leadSheetChords"
          if (p.classList.contains("leadSheetChords")) {
            details.push({
              id: uuid(),
              content: JSON.stringify(
                convertHtmlChordsToArray(p.textContent?.trim() || "")
              ),
              type: LeadSheetDetailType.Chords,
            });
          }

          // if there is a span inside the p, this is just a text detail
          else if (p.querySelector("span")) {
            details.push({
              id: uuid(),
              content: p.textContent?.trim() || "",
              type: LeadSheetDetailType.Text,
            });
          }

          // if there is an img, this is an image detail
          else if (p.querySelector("img")) {
            const img = p.querySelector("img") as HTMLImageElement;
            const src = img.src;

            // Fetch the image and convert to File object
            const response = await fetch(src);
            const blob = await response.blob();
            const file = new File([blob], `image-${uuid()}.jpg`, {
              type: "image/jpeg",
            });

            const { data } = await createPresignedUrl({
              variables: {
                mimeType: "image/jpeg",
              },
            });

            if (!data) {
              console.error("Failed to create presigned url");
              // continue without adding this detail
              return;
            }

            const {
              adminCreatePresignedUrl: { url: presignedUrl, key },
            } = data;

            uploadFile({ file, presignedUrl, onProgress: () => {} }).then(
              () => {
                details.push({
                  id: uuid(),
                  content: convertImageKeyToContentString(key),
                  type: LeadSheetDetailType.Image,
                });
              }
            );
          }
        }
      });
      await Promise.all(promises);

      leadSheetSectionInput.details = details;

      return leadSheetSectionInput;
    });

    const sectionInputs = await Promise.all(trPromises);

    // create lead sheet itself
    const { data: leadSheetData, errors: leadSheetErrors } =
      await createLeadSheet({
        variables: {
          songId,
        },
      });

    if (leadSheetErrors || !leadSheetData?.createLeadSheet.id) {
      console.error("Failed to create lead sheet", leadSheetErrors);
      return;
    }

    const leadSheetId = leadSheetData?.createLeadSheet.id;

    // create lead sheet sections
    const sectionPromises = sectionInputs.map(async (input) => {
      if (!input) return;
      return createLeadSheetSection({
        variables: {
          leadSheetId: leadSheetId,
          data: input,
        },
      });
    });
    await Promise.all(sectionPromises);
  }, [
    doc,
    createLeadSheet,
    songId,
    createPresignedUrl,
    createLeadSheetSection,
  ]);
}

/**
 * Converts a string like "|C |D |E Bb |F" to an array of measures with chords like [["C"], ["D"], ["E", "Bb"], ["F"]].
 * There may be a trailing "|" at the end of the string, which should be ignored.
 */
function convertHtmlChordsToArray(chords: string): string[][] {
  return chords
    .split("|")
    .filter((measureString) => Boolean(measureString.trim()))
    .map((measureString) => measureString.trim().split(/\s+/));
}

function convertImageKeyToContentString(key: string): string {
  const newImageDetail: ParsedImageDetail = {
    ...DEFAULT_IMAGE_DETAIL,
    url: key,
  };

  return JSON.stringify(newImageDetail);
}
