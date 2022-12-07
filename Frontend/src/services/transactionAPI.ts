import axios from "axios";

const requester = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

async function transactionCreate(token: string, target: string, value: string) {
  const apiResponse = await requester.post<Transaction>(
    "/transactions",
    {
      value,
      target,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return apiResponse.data;
}

export const transactionAPI = {
  create: transactionCreate,
};
