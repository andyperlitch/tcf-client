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

    const { stageQrStyles, stageQrTextStyles } = useMemo(
      () => ({
        stageQrStyles: {
          backgroundColor: bgColor,
        },
        stageQrTextStyles: {
          width: `${width}px`,
          color: fgColor,
        },
      }),
      [bgColor, fgColor, width]
    );

    return (
      <div
        style={stageQrStyles}
        data-name="STAGE-QR"
        className={`
          flex flex-col items-center rounded-lg

          ${className}

          p-4
        `}
      >
        <p
          data-name="STAGE-QR-TEXT"
          style={stageQrTextStyles}
          className={`whitespace-nowrap text-center font-hand text-4xl`}
        >
          {event?.activeEngagement?.qrCodeCta || lastCtaText.current}
        </p>
        <QRCode
          data-name="STAGE-QR-CODE"
          value={`${window.location.origin}/e/${eventSlug}`}
          size={width}
          level="L"
          fgColor={fgColor}
          bgColor={bgQRColor}
          className="mt-4"
        />
      </div>
    );
  }
);
StageQR.displayName = "StageQR";
