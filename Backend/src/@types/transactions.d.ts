export {};
declare global {
  export interface TransactionRequest {
    target: string;
    value: string;
  }

  export interface Transaction {
    type: "credit" | "debit";
    createdAt: Date;
    value: number;
    from?: string;
    to?: string;
  }
}
