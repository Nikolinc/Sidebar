import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import ErrorPage from "../pages/error/error";
import RootPage from "../pages/rootPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ]
  },

]);

export default router