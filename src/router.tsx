import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screen/Home";
import Search from "./screen/Search";
import Popular from "./screen/Popular";
import NowPlaying from "./screen/NowPlaying";
import ComingSoon from "./screen/ComingSoon";

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
        path: "Popular",
        element: <Popular />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
      // {
      //   path: "search",
      //   element: <Search />,
      // },
    ],
  },
]);
