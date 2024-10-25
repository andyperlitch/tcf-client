import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { SetList } from "./routes/SetList";
import { SetListSong } from "./routes/SetListSong";
import { Event } from "./routes/event";
import { SetListProvider } from "./providers/SetListProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Sets } from "./routes/Sets";
import { ApolloProvider } from "./providers/ApolloProvider";
import { Login } from "./routes/Login";
import { ProtectedArea } from "./components/ProtectedArea";
import { AdminHome } from "./routes/admin/home";
import { AuthProvider } from "./providers/AuthProvider";
import { AdminEventPage } from "./routes/admin/event";
import { AdminEngagement } from "./routes/admin/event/engagement";
import { AdminEvents } from "./routes/admin/events";
import { EventStageScreen } from "./routes/stage/EventStageScreen";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    // Set List pages
    element: (
      <SetListProvider>
        <Outlet />
      </SetListProvider>
    ),
    children: [
      {
        path: "/sets/:setSlug",
        element: <SetList />,
      },
      {
        path: "/sets/:setSlug/:songIndex",
        element: <SetListSong />,
      },
      {
        path: "/sets",
        element: <Sets />,
      },
      {
        path: "/event/:slug",
        element: <Event />,
      },
      {
        path: "/setlist",
        element: <Navigate to="/sets/funks-giving" />,
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
        path: "/admin/events/:slug/engagements/:engagementId",
        element: <AdminEngagement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="tcf-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
