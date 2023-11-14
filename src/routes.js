import { useRoutes } from "react-router-dom";
import { AuthTabs } from "./pages";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <AuthTabs />,
    },
  ]);

  return elements;
};
