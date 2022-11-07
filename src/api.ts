import { IComment, ILoginResponse } from "./types";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (
  username: string,
  password: string,
  isEnabled: boolean
): Promise<ILoginResponse> => {
  const url = isEnabled ? "/api/login" : "/api/login-secure";
  const response = await axios.post(`${API_URL}${url}`, {
    username,
    password,
  });

  return response.data;
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
