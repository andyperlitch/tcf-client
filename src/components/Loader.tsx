import "./Loader.css";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function FullScreenLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader />
    </div>
  );
}
