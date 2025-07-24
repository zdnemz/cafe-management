export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}
