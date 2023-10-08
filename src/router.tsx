import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screen/Home";
import Search from "./screen/Search";
import Popular from "./screen/Popular";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies/:id",
        element: <Home />,
      },
      {
        path: "popular",
        element: <Popular />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
