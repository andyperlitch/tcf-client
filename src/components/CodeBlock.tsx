export function CodeBlock({
  json,
  children,
  maxHeight,
  className,
}: {
  json?: any;
  children?: any;
  maxHeight?: string;
  className?: string;
}) {
  const style = maxHeight ? { maxHeight, overflow: "auto" } : {};
  return (
    <pre
      className={`
        mt-4 overflow-auto rounded-md bg-slate-50 p-3 text-muted text-md
        font-mono

        ${className}
      `}
      style={style}
    >
      {children || JSON.stringify(json, null, 2)}
    </pre>
  );
}
