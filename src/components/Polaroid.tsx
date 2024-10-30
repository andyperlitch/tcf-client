export function Polaroid({
  width = 300,
  photoUrl,
  caption,
}: {
  photoUrl: string;
  caption?: string;
  width?: number;
}) {
  return (
    <div className="polaroid bg-white p-4 shadow-md">
      <img width={width} src={photoUrl} />
      <div className="font-hand text-sm">{caption || ""}</div>
    </div>
  );
}
