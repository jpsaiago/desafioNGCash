import axios from "axios";

const requester = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

async function userLogin(username: string, password: string) {
  const apiResponse = await requester.post<LoginResponse>("/login", {
    username,
    password,
  });
  return apiResponse.data;
}

async function userSignup(username: string, password: string) {
  const apiResponse = await requester.post<{ message: string }>("/users", {
    username,
    password,
  });
  return apiResponse.data;
}

async function userGetInfo(token: string) {
  const apiResponse = await requester.get<UserInfo>("users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return apiResponse.data;
}

export const userAPI = {
  login: userLogin,
  signup: userSignup,
  getInfo: userGetInfo,
};
