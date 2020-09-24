export interface User {
  id: string;
  key: string;
  token: string;
  refreshToken: string;
  name: string;
  authenticated: boolean;
}
