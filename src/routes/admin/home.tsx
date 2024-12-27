import { Navigate } from "react-router-dom";

export function AdminHome() {
  return <Navigate to="/admin/events" />;
}

export default AdminHome;
