export function CodeBlock({ json, children }: { json?: any; children?: any }) {
  return (
    <pre
      className={`mt-4 rounded-md bg-slate-50 p-3 text-muted text-md font-mono`}
    >
      {children || JSON.stringify(json, null, 2)}
    </pre>
  );
}
