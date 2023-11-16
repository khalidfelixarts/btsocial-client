import { useRoutes } from "react-router-dom";
import {
  AuthTabs,
  ResetPassword,
  Feeds,
  Chat,
  People,
  Following,
  Followers,
  Photos,
  Notifications,
  Profile,
  App,
} from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";

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
    {
      path: "/app/home",
      element: (
        // <ProtectedRoute>
        <App />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "feeds",
          element: <Feeds />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "people",
          element: <People />,
        },
        {
          path: "following",
          element: <Following />,
        },
        {
          path: "followers",
          element: <Followers />,
        },
        {
          path: "photos",
          element: <Photos />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "profile/:username",
          element: <Profile />,
        },
      ],
    },
  ]);

  return elements;
};
