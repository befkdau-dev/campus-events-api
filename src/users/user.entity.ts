export class User {
  id: number;
  email: string;
  passwordHash: string;
  roles: string[];
  refreshHash: string | null;
}
