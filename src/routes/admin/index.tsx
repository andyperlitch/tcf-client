/* eslint-disable react-refresh/only-export-components */
import { ProtectedArea } from "@/components/ProtectedArea";
import { lazy } from "react";
import { Outlet } from "react-router-dom";

// Lazy load admin components
const AdminHome = lazy(() => import("@/routes/admin/home"));
const AdminEvents = lazy(() => import("@/routes/admin/events"));
const AdminEventPage = lazy(
  () => import("@/routes/admin/event/AdminEventPage")
);
const AdminEventControlPage = lazy(
  () => import("@/routes/admin/event/AdminEventControlPage")
);
const AdminEngagementPage = lazy(
  () => import("@/routes/admin/event/engagement/AdminEngagementPage")
);
const AdminSubmissionPage = lazy(
  () => import("@/routes/admin/event/engagement/submission/AdminSubmissionPage")
);

export const adminRoutes = {
  element: (
    <ProtectedArea roles={["ADMIN"]} redirectTo="/login?redirect=$path">
      <Outlet />
    </ProtectedArea>
  ),
  children: [
    {
      path: "/admin",
      element: <AdminHome />,
    },
    {
      path: "/admin/events",
      element: <AdminEvents />,
    },
    {
      path: "/admin/events/:slug",
      element: <AdminEventPage />,
    },
    {
      path: "/admin/events/:slug/control",
      element: <AdminEventControlPage />,
    },
    {
      path: "/admin/events/:slug/engagements/:engagementId",
      element: <AdminEngagementPage />,
    },
    {
      path: "/admin/events/:slug/engagements/:engagementId/submissions/:submissionId",
      element: <AdminSubmissionPage />,
    },
  ],
};
