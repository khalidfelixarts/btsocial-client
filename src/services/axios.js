import axios from "axios";

export const BASE_ENDPOINT = process.env.REACT_APP_BASE_ENDPOINT;

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});
