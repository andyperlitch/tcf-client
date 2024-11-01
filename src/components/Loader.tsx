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
