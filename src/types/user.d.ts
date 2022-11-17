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
