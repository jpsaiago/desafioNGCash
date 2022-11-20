export {};
declare global {
  export interface Transaction {
    sender: string;
    receiver: string;
    value: number;
  }
}
