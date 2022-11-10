import { IComment, ILoginResponse } from "./types";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (
  username: string,
  password: string,
  isEnabled: boolean
): Promise<ILoginResponse> => {
  const url = isEnabled ? "/api/login" : "/api/login-secure";
  const response = await fetch(`${API_URL}${url}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

export const logout = async (): Promise<ILoginResponse> => {
  const response = await fetch(`${API_URL}/api/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getComments = async (): Promise<IComment[]> => {
  const response = await fetch(`${API_URL}/comments`);
  return response.json();
};

export const postComment = async (text: string): Promise<void> => {
  await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
};

export const resetComments = async (): Promise<void> => {
  await fetch(`${API_URL}/comments`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const resetBalance = async (): Promise<void> => {
  await fetch(`${API_URL}/reset-balance`);
};

export const getCSRFToken = async () => {
  const response = await axios.get(`${API_URL}/csrf-token`);
  axios.defaults.headers.post["X-CSRF-Token"] = response.data.csrfToken;
};

export const transferMoney = async (
  amount: number,
  to: string
): Promise<void> => {
  await axios.get(`${API_URL}/api/transfer-secure?amount=${amount}&to=${to}`, {
    withCredentials: true,
  });
};
