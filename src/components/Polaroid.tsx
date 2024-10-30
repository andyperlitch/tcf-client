import { cn } from "@/lib/utils";

export function Polaroid({
  width = 300,
  photoUrl,
  caption,
  className,
  style,
}: {
  photoUrl?: string | null;
  caption?: string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        `
          polaroid rounded-sm bg-white p-4
          shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] shadow-md
        `,
        className
      )}
      style={style}
    >
      {photoUrl && <img style={{ width }} src={photoUrl} />}

      <div className="p-4 font-hand text-5xl text-black">{caption || " "}</div>
    </div>
  );
}
