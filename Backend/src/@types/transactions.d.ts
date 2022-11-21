export {};
declare global {
  export interface Transaction {
    receiver: string;
    value: number;
  }
}
