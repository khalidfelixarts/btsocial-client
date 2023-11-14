import { useRoutes } from "react-router-dom";
import { AuthTabs, ResetPassword } from "./pages";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <AuthTabs />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return elements;
};
