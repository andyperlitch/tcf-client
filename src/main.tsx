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
        path: "/event/:eventId",
        element: <Event />,
      },
      {
        path: "/setlist",
        element: <Navigate to="/sets/funks-giving" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider>
      <ThemeProvider defaultTheme="dark" storageKey="tcf-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
