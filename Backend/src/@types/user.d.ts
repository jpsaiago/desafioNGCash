export {};
declare global {
  export interface Credentials {
    username: string;
    password: string;
  }

  export interface TokenPayload {
    userId: string;
    username: string;
    exp: number;
  }
}
