import { IComment, ILoginResponse } from "./types";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (
  username: string,
  password: string,
  isEnabled: boolean
): Promise<ILoginResponse> => {
  const url = isEnabled ? "/api/login" : "/api/login-secure";
  const response = await fetch(url, {
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
  const response = await fetch("/api/logout", {
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
