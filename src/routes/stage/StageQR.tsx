import { StageEventFragment } from "@/gql/graphql";
import { memo, useEffect, useMemo, useRef } from "react";
import QRCode from "react-qr-code";

interface StageQRProps {
  eventSlug?: string;
  /**
   * width, in px. does not include padding
   */
  width: number;
  bgColor?: string;
  fgColor?: string;
  bgQRColor?: string;
  className?: string;
  event?: StageEventFragment | null;
}

export const StageQR = memo(
  ({
    eventSlug,
    width,
    bgColor = "#FFFFFF77",
    fgColor = "#000000",
    bgQRColor = "#FFFFFF",
    className = "",
    event,
  }: StageQRProps) => {
    const lastCtaText = useRef(event?.activeEngagement?.qrCodeCta);

    useEffect(() => {
      if (event?.activeEngagement?.qrCodeCta) {
        lastCtaText.current = event.activeEngagement.qrCodeCta;
      }
    }, [event?.activeEngagement?.qrCodeCta]);

    const { stageQrContainerStyles, stageQrTextStyles, stageQrStyles } =
      useMemo(
        () => ({
          stageQrContainerStyles: {
            backgroundColor: bgColor,
            padding: "2vh 1.5vw",
          },
          stageQrTextStyles: {
            width: `${width}px`,
            color: fgColor,
            fontSize: "2.3vw",
          },
          stageQrStyles: {
            marginTop: "1vh",
          },
        }),
        [bgColor, fgColor, width]
      );

    return (
      <div
        style={stageQrContainerStyles}
        data-name="STAGE_QR"
        className={`
          flex flex-col items-center rounded-lg

          ${className}
        `}
      >
        <p
          data-name="STAGE_QR_TEXT"
          style={stageQrTextStyles}
          className={`whitespace-nowrap text-center font-stage`}
        >
          {event?.activeEngagement?.qrCodeCta || lastCtaText.current}
        </p>
        <QRCode
          style={stageQrStyles}
          data-name="STAGE_QR_CODE"
          value={`${window.location.origin}/e/${eventSlug}`}
          size={width}
          level="L"
          fgColor={fgColor}
          bgColor={bgQRColor}
        />
      </div>
    );
  }
);
StageQR.displayName = "StageQR";
