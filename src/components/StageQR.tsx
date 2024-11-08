import { useMemo } from "react";
import QRCode from "react-qr-code";

interface StageQRProps {
  slug?: string;
  /**
   * width, in px. does not include padding
   */
  width: number;
  bgColor?: string;
  fgColor?: string;
  bgQRColor?: string;
  className?: string;
}

export function StageQR({
  slug,
  width,
  bgColor = "#FFFFFF77",
  fgColor = "#000000",
  bgQRColor = "#FFFFFF",
  className = "",
}: StageQRProps) {
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

  if (!slug) return null;

  return (
    <div
      style={stageQrStyles}
      data-name="STAGE-QR"
      className={`
        mb-4 mr-4 flex flex-col items-center rounded-lg

        ${className}

        p-4
      `}
    >
      <p
        data-name="STAGE-QR-TEXT"
        style={stageQrTextStyles}
        className={`text-center font-hand text-5xl`}
      >
        Only scan this if you're cool
      </p>
      <QRCode
        data-name="STAGE-QR-CODE"
        value={`${window.location.origin}/e/${slug}`}
        size={width}
        level="L"
        fgColor={fgColor}
        bgColor={bgQRColor}
        className="mt-4"
      />
    </div>
  );
}
