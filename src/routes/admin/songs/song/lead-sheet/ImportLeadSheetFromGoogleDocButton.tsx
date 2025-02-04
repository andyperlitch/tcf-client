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
import { DEFAULT_IMAGE_DETAIL } from "./consts";
import { DownloadIcon } from "@radix-ui/react-icons";
import { getBackendDetails } from "@/utils/getBackendDetails";
import { createLogger } from "@/utils/createLogger";
import { ParsedImageDetail } from "@/types/leadsheet";

const logger = createLogger("ImportLeadSheetFromGoogleDocButton");

export function ImportLeadSheetFromGoogleDocButton({
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
      <DownloadIcon className="mr-1 h-4 w-4" />
      Import Lead Sheet from Google Doc
    </Button>
  );
}

const { hostname, httpProtocol } = getBackendDetails();

function useSyncLeadSheet({ url, songId }: { url: string; songId: number }) {
  const { html, loading: htmlLoading } = useLeadSheetHtml({ url });

  const [createPresignedUrl] = useAdminCreatePresignedUrlMutation();
  const [createLeadSheet] = useBandCreateLeadSheetMutation();
  const [createLeadSheetSection] = useBandCreateLeadSheetSectionMutation();

  // get parsed html
  const doc = useMemo(() => {
    if (htmlLoading) return null;
    else if (!html) return null;
    logger.log("Fetched html, parsing");
    return new DOMParser().parseFromString(html, "text/html");
  }, [html, htmlLoading]);

  // sync lead sheet
  return useCallback(async () => {
    if (!doc) return null;
    logger.log("Parsing table for data");
    try {
      // loop through <tr> elements in the table
      const trs = doc.querySelectorAll("table tr");
      const trPromises = Array.from(trs).map(async (tr, index) => {
        // create the input object
        const leadSheetSectionInput: CreateLeadSheetSectionInput = {
          order: index,
        };

        // select first <td>
        const headerCell = tr.querySelector("td");
        if (!headerCell) {
          logger.error("No header cell found");
          return;
        }

        // the first span in the h3 contains the `name`
        const name = headerCell
          .querySelector("h3")
          ?.querySelector("span")?.textContent;
        if (!name) {
          logger.error("No name found");
          return;
        }
        leadSheetSectionInput.name = name;

        // the p.lyric contains the `lyricHint`
        const lyricHint = headerCell.querySelector("p.lyric")?.textContent;
        if (lyricHint) {
          logger.debug("Found lyric hint", lyricHint);
          leadSheetSectionInput.lyricHint = lyricHint;
        }

        // the span.leadSheetRecordingTimestamp contains the `timeCode`
        const timeCode = headerCell.querySelector(
          "span.leadSheetRecordingTimestamp"
        )?.textContent;
        if (timeCode) {
          logger.debug("Found time code", timeCode);
          leadSheetSectionInput.timeCode = timeCode;
        }

        // select second <td>
        const lengthCell = tr.querySelector("td:nth-child(2)");
        if (!lengthCell) {
          logger.error("No length cell found");
          return;
        }

        // all of the td's text content is the `barLength`
        const barLength = lengthCell.textContent;
        if (barLength) {
          logger.debug("Found bar length", barLength);
          leadSheetSectionInput.barLength = barLength.trim();
        }

        // select third <td>
        const detailsCell = tr.querySelector("td:nth-child(3)");
        if (!detailsCell) {
          logger.error("No details cell found");
          return;
        }

        const details: LeadSheetDetailInput[] = [];

        // iterate through all children of the detailsCell
        logger.debug("Iterating through details cell children");
        const promises = Array.from(detailsCell.childNodes).map(
          async (child) => {
            // should all be in p tags
            if (child.nodeType === 1) {
              const p = child as HTMLParagraphElement;

              // if the p tag has the class "leadSheetChords"
              if (p.classList.contains("leadSheetChords")) {
                logger.debug("Found lead sheet chords", p.textContent?.trim());
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
                logger.debug("Found text detail", p.textContent?.trim());
                details.push({
                  id: uuid(),
                  content: p.textContent?.trim() || "",
                  type: LeadSheetDetailType.Text,
                });
              }

              // if there is an img, this is an image detail
              else if (p.querySelector("img")) {
                const img = p.querySelector("img") as HTMLImageElement;
                const url = img.src;
                logger.debug("Found image detail with url: ", url);

                // Fetch the image via the proxy endpoint and convert to File object
                logger.debug("Fetching image via proxy endpoint");
                const response = await fetch(
                  `${httpProtocol}://${hostname}/proxy?targetUrl=${encodeURIComponent(
                    url
                  )}`
                );
                const blob = await response.blob();

                logger.debug("Converting blob to file");
                const file = new File([blob], `image-${uuid()}.jpg`, {
                  type: "image/jpeg",
                });

                logger.debug("Creating presigned url");
                const { data } = await createPresignedUrl({
                  variables: {
                    mimeType: "image/jpeg",
                  },
                });

                if (!data) {
                  logger.error("Failed to create presigned url");
                  // continue without adding this detail
                  return;
                }

                logger.debug("Uploading file to presigned url");
                const {
                  adminCreatePresignedUrl: { url: presignedUrl, key },
                } = data;

                await uploadFile({
                  file,
                  presignedUrl,
                  onProgress: () => {},
                }).then(() => {
                  const detail = {
                    id: uuid(),
                    content: convertImageKeyToContentString(key),
                    type: LeadSheetDetailType.Image,
                  };
                  logger.debug("Uploaded file to presigned url", detail);
                  details.push(detail);
                });
              }
            } else {
              logger.debug("Skipping child node which was not a p tag", child);
            }
          }
        );
        await Promise.all(promises);

        leadSheetSectionInput.details = details;

        return leadSheetSectionInput;
      });

      const sectionInputs = await Promise.all(trPromises);

      // create lead sheet itself
      logger.log("Creating lead sheet for song", songId);
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
      logger.log("Creating lead sheet sections");
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
    } catch (e) {
      console.error("Failed to import lead sheet", e);
    }
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
