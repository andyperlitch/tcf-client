import { useImageLoader } from "@/hooks/useImageLoader";
import { cn } from "@/lib/utils";

export function Polaroid({
  height = "60vh",
  photoUrl,
  caption,
  className,
  initialStyle,
  loadedStyle,
}: {
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

  return (
    <div
      className={cn(`polaroid rounded-sm bg-white p-4 shadow-md`, className)}
      style={imageLoaded ? loadedStyle : initialStyle}
    >
      {photoUrl && <img style={{ height }} src={photoUrl} />}

      <div className="p-4 font-hand text-4xl text-black">{caption || " "}</div>
    </div>
  );
}
