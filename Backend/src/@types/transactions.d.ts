export {};
declare global {
  export interface TransactionRequest {
    receiver: string;
    value: number;
  }

  export interface Transaction {
    type: "credit" | "debit";
    createdAt: Date;
    value: number;
    from: string;
    to: string;
  }
}
