import { ILoginResponse } from "./types";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (
  username: string,
  password: string,
  isSecure: boolean
): Promise<ILoginResponse> => {
  const url = isSecure ? `${API_URL}/login-secure` : `${API_URL}/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response.json();
};
