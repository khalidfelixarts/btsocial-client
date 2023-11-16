import { createAsyncThunk } from "@reduxjs/toolkit";
import { user_getUserSuggestions } from "../../services/api/user/user.service";

export const getUserSuggestions = createAsyncThunk(
  "user/getSuggestions",
  async (name, { dispatch }) => {
    try {
      const response = await user_getUserSuggestions();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
