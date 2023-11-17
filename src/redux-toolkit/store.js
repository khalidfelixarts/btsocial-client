import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/user.reducer";
import suggestionsReducer from "./reducers/suggestions/suggestions.reducer";
import notificationReducer from "./reducers/notifications/notification.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionsReducer,
    notifications: notificationReducer,
  },
});
