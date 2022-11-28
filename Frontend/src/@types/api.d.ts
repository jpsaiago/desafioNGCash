export {};

declare global {
  export interface LoginResponse {
    username: string;
    token: string;
    exp: Date;
  }
}
