import axios from "axios";

const requester = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

export async function userLogin(username: string, password: string) {
  const apiResponse = await requester.post<LoginResponse>("/login", {
    username,
    password,
  });
  return apiResponse.data;
}

export async function userSignup(username: string, password: string) {
  const apiResponse = await requester.post<string>("/users", {
    username,
    password,
  });
  return apiResponse.data;
}
