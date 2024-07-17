import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { SetList } from "./routes/set-list";
import { SetListSong } from "./routes/SetListSong";
import { SetListProvider } from "./providers/set-list-provider";

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
        path: "/setlist",
        element: <SetList />,
      },
      {
        path: "/setlist/:songIndex",
        element: <SetListSong />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
