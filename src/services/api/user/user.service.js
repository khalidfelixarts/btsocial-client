import axios from "../../axios";

export async function user_getUserSuggestions(body) {
  const response = await axios.get("/user/profile/user/suggestions", body);
  return response;
}

export async function user_logoutUser() {
  const response = await axios.get("/signout");
  console.log(response);
  return response;
}

export async function user_currentUser() {
  const response = await axios.get("/current-user");
  return response;
}
