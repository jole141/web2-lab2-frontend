export interface ILoginResponse {
  user?: string;
  message?: string;
}

export interface ITest {
  username: string;
  password: string;
  success: boolean;
  message: string;
}

export interface IComment {
  id: number;
  text: string;
}
