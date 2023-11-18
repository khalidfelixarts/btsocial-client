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
  const response = await axios.get("/currentuser");
  return response;
}

export async function user_getAllUsers(page) {
  const response = await axios.get(`/user/all/${page}`);
  return response;
}

export async function user_searchUsers(query) {
  const response = await axios.get(`/user/profile/search/${query}`);
  return response;
}

export async function user_getUserProfileByUserId(userId) {
  const response = await axios.get(`/user/profile/${userId}`);
  return response;
}

export async function user_getUserProfileByUsername(username, userId, uId) {
  const response = await axios.get(
    `/user/profile/posts/${username}/${userId}/${uId}`
  );
  return response;
}

export async function user_changePassword(body) {
  const response = await axios.put("/user/profile/change-password", body);
  return response;
}

export async function user_updateNotificationSettings(settings) {
  const response = await axios.put("/user/profile/settings", settings);
  return response;
}

export async function user_updateBasicInfo(info) {
  const response = await axios.put("/user/profile/basic-info", info);
  return response;
}

export async function user_updateSocialLinks(info) {
  const response = await axios.put("/user/profile/social-links", info);
  return response;
}
