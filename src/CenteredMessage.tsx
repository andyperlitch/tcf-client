import "./CenteredMessage.css";

export function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="centeredMessage">
      {typeof children === "string" ? <h3>{children}</h3> : children}
    </div>
  );
}
