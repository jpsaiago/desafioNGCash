export {};
declare global {
  namespace Express {
    export interface Request {
      context?: {
        username?: string;
      };
    }
  }
}
