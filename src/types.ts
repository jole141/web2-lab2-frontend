export interface ILoginResponse {
  token?: string;
  message?: string;
}

export interface ITest {
  username: string;
  password: string;
  success: boolean;
  message: string;
}
