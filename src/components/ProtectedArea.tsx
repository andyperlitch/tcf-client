import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedAreaProps {
  roles: string[];
  redirectTo: string;
  children: React.ReactNode;
}

export function ProtectedArea({
  roles,
  redirectTo,
  children,
}: ProtectedAreaProps) {
  const { user } = useAuth();
  const path = useLocation().pathname;

  if (!user || !roles.includes(user.role)) {
    return (
      <Navigate to={redirectTo.replace("$path", encodeURIComponent(path))} />
    );
  }
  return <>{children}</>;
}
