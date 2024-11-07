import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Polaroid({
  height = "60vh",
  photoUrl,
  caption,
  className,
  style,
  initialStyle,
}: {
  photoUrl?: string | null;
  caption?: string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  initialStyle?: React.CSSProperties;
}) {
  const [currentStyle, setCurrentStyle] = useState(initialStyle || style);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentStyle(style);
    }, 100);
    return () => clearTimeout(timeout);
  }, [style]);

  return (
    <div
      className={cn(`polaroid rounded-sm bg-white p-4 shadow-md`, className)}
      style={currentStyle}
    >
      {photoUrl && <img style={{ height }} src={photoUrl} />}

      <div className="p-4 font-hand text-4xl text-black">{caption || " "}</div>
    </div>
  );
}
