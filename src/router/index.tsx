import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import ErrorPage from "../pages/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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