import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screen/Home";
import Search from "./screen/Search";
import Tv from "./screen/Tv";

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
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);
