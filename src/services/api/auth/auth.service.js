import axios from "../../axios";

export async function auth_signUp(body) {
  const response = await axios.post("/signup", body);
  return response;
}

export async function auth_signIn(body) {
  const response = await axios.post("/signin", body);
  return response;
}

export async function auth_forgotPassword(email) {
  const response = await axios.post("/forgot-password", email);
  return response;
}

export async function auth_resetPassword(token, body) {
  const response = await axios.post(`/reset-password/${token}`, body);
  return response;
}
