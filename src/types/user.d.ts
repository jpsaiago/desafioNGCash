export interface Credentials {
  username: string;
  password: string;
}

export interface LoggedUser {
  token: string;
  username: string;
  userId: string;
  accountId: string;
}

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}
