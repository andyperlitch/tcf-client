import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Polaroid({
  width = 300,
  photoUrl,
  caption,
  className,
  style,
  initialStyle,
}: {
  photoUrl?: string | null;
  caption?: string;
  width?: number | string;
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
      className={cn(
        `
          polaroid rounded-sm bg-white p-4
          shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] shadow-md
        `,
        className
      )}
      style={currentStyle}
    >
      {photoUrl && <img style={{ width }} src={photoUrl} />}

      <div className="p-4 font-hand text-4xl text-black">{caption || " "}</div>
    </div>
  );
}
