import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { SetList } from "./routes/SetList";
import { SetListSong } from "./routes/SetListSong";
import { Event } from "./routes/event";
import { SetListProvider } from "./providers/SetListProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        path: "/event/:eventId",
        element: <Event />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="tcf-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
