export {};

declare global {
  interface LoginResponse {
    username: string;
    token: string;
    exp: Date;
  }

  interface Transaction {
    type: "credit" | "debit";
    createdAt: Date;
    value: number;
    from?: string;
    to?: string;
  }

  interface UserInfo {
    balance: number;
    transactions: Transaction[];
  }
}
