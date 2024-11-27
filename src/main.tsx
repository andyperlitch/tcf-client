import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Home from "./routes/home/home";
import ErrorPage from "./error-page";
import { ProtectedArea } from "./components/ProtectedArea";
import { MasterSongListProvider } from "./providers/MasterSongListProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AnalyticsProvider } from "./providers/AnalyticsProvider";
import { Gigs } from "./routes/gigs/Gigs";
import { ApolloProvider } from "./providers/ApolloProvider";
import { Login } from "./routes/Login";
import { Gig } from "./routes/gigs/Gig";
import { SetListSong } from "./routes/gigs/SetListSong";
import { EventFanScreen } from "./routes/fan/EventFanScreen";
import { AdminHome } from "./routes/admin/home";
import { AuthProvider } from "./providers/AuthProvider";
import { AdminEventPage } from "./routes/admin/event";
import { AdminSubmissionPage } from "./routes/admin/event/engagement/submission";
import { AdminEngagementPage } from "./routes/admin/event/engagement";
import { AdminEvents } from "./routes/admin/events";
import { EventStageScreen } from "./routes/stage/EventStageScreen";
import { Toaster } from "./components/ui/toaster";
import { QuickSignup } from "./routes/QuickSignup";
import { TooltipProvider } from "./components/ui/tooltip";
import { AdminEventControlPage } from "./routes/admin/event/AdminEventControlPage";
import { EventStagesPage } from "./routes/stage/EventStagesPage";

const router = createBrowserRouter([
  {
    element: (
      <AnalyticsProvider>
        <Outlet />
      </AnalyticsProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stage/:slug",
        element: <EventStageScreen />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stage",
        element: <EventStagesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/e/:slug",
        element: <EventFanScreen />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/quick-signup",
        element: <QuickSignup />,
        errorElement: <ErrorPage />,
      },
      {
        // Set List pages
        element: (
          <MasterSongListProvider>
            <Outlet />
          </MasterSongListProvider>
        ),
        children: [
          {
            path: "/sets/*",
            element: <Navigate to="/gigs" />,
          },
          {
            path: "/setlist",
            element: <Navigate to="/gigs" />,
          },

          {
            path: "/gigs/:gigSlug/sets/:setIndex/:songIndex",
            element: <SetListSong />,
          },
          {
            path: "/gigs/:gigSlug",
            element: <Gig />,
          },
          {
            path: "/gigs",
            element: <Gigs />,
          },
        ],
      },
      {
        // Admin pages
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="tcf-ui-theme">
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
