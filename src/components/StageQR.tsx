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
  if (!slug) return null;
  return (
    <div
      className={`
        mb-4 mr-4 flex flex-col items-center rounded-lg

        bg-[${bgColor}]

        ${className}

        p-4
      `}
    >
      <p
        className={`
          text-center font-hand text-5xl

          text-[${fgColor}]
        `}
        style={{ width: `${width}px` }}
      >
        Only scan this if you're cool
      </p>
      <QRCode
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
