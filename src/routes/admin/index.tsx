/* eslint-disable react-refresh/only-export-components */
import { ProtectedArea } from "@/components/ProtectedArea";
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AdminGigsPage } from "./gigs";
import { AdminGigPage } from "./gigs/gig";
import { AdminSongsPage } from "./songs";
import { AdminUsersPage } from "./users";
import { AdminLeadSheetPage } from "./songs/song/lead-sheet/AdminLeadSheetPage";
import { AdminSongPage } from "./songs/song/AdminSongPage";
import { AdminFilesPage } from "./files/AdminFilesPage";

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
    {
      path: "/admin/users",
      element: <AdminUsersPage />,
    },
    // BAND-SPECIFIC ADMIN ROUTES
    {
      path: "/admin/gigs",
      element: <AdminGigsPage />,
    },
    {
      path: "/admin/gigs/:gigId",
      element: <AdminGigPage />,
    },
    {
      path: "/admin/songs",
      element: <AdminSongsPage />,
    },
    {
      path: "/admin/songs/:songId",
      element: <AdminSongPage />,
    },
    {
      path: "/admin/songs/:songId/lead-sheet/:leadSheetId",
      element: <AdminLeadSheetPage />,
    },
    {
      path: "/admin/files",
      element: <AdminFilesPage />,
    },
  ],
};
