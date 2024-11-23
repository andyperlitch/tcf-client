export function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`
        flex h-full w-full items-center justify-center px-4

        md:text-3xl
      `}
    >
      <div className="max-w-screen-sm text-center text-2xl">{children}</div>
    </div>
  );
}
