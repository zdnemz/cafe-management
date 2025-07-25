export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "CUSTOMER" | "ADMIN" | "STAFF";
  };
}
