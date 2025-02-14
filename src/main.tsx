import React, { Suspense } from "react";
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
import { MasterSongListProvider } from "./providers/MasterSongListProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AnalyticsProvider } from "./providers/AnalyticsProvider";
import { Gigs } from "./routes/gigs/Gigs";
import { ApolloProvider } from "./providers/ApolloProvider";
import { Login } from "./routes/Login";
import { Gig } from "./routes/gigs/Gig";
import { SetListSong } from "./routes/gigs/SetListSong";
import { EventFanScreen } from "./routes/fan/EventFanScreen";
import { AuthProvider } from "./providers/AuthProvider";
import { EventStageScreen } from "./routes/stage/EventStageScreen";
import { Toaster } from "./components/ui/toaster";
import { QuickSignup } from "./routes/QuickSignup";
import { TooltipProvider } from "./components/ui/tooltip";
import { EventStagesPage } from "./routes/stage/EventStagesPage";
import { Loader } from "./components/Loader";
import { adminRoutes } from "./routes/admin";

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
            path: "/g",
            element: <Navigate to="/gigs" />,
          },
          {
            path: "/sets/*",
            element: <Navigate to="/gigs" />,
          },
          {
            path: "/setlist",
            element: <Navigate to="/gigs" />,
          },

          {
            path: "/gigs/:gigId/songs/:gigSongId",
            element: <SetListSong />,
          },
          {
            path: "/gigs/:gigId/setbreak/:lastSetId/:nextSetId",
            element: <SetListSong />,
          },
          {
            path: "/gigs/:gigId",
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
        ...adminRoutes,
        element: (
          <Suspense fallback={<Loader />}>{adminRoutes.element}</Suspense>
        ),
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
