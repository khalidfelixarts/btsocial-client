import axios from "../../axios";

export async function user_getUserSuggestions(body) {
  const response = await axios.get("/user/profile/user/suggestions", body);
  return response;
}
