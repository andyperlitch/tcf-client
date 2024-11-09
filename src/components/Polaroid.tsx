import { useImageLoader } from "@/hooks/useImageLoader";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function Polaroid({
  width = "20vw",
  photoUrl,
  caption,
  className,
  initialStyle,
  loadedStyle,
}: {
  width?: number | string;
  photoUrl?: string;
  caption?: string;
  height?: number | string;
  className?: string;
  /**
   * style to apply when the image has loaded
   */
  loadedStyle?: React.CSSProperties;
  /**
   * style to apply when the image is not loaded
   */
  initialStyle?: React.CSSProperties;
}) {
  const { imageLoaded } = useImageLoader({ url: photoUrl });
  const imageStyles = useMemo(() => ({ width }), [width]);
  const textStyles = useMemo(() => ({ width }), [width]);

  return (
    <div
      className={cn(`polaroid rounded-sm bg-white p-4 shadow-md`, className)}
      style={imageLoaded ? loadedStyle : initialStyle}
    >
      {photoUrl && <img style={imageStyles} src={photoUrl} />}

      <div className="p-4 font-hand text-4xl text-black" style={textStyles}>
        {caption || " "}
      </div>
    </div>
  );
}
