export function CenteredMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        flex h-full w-full items-center justify-center px-4

        ${className}

        md:text-3xl
      `}
    >
      <div className="max-w-screen-sm text-center text-2xl">{children}</div>
    </div>
  );
}
