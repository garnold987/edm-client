import { Role } from "./role.model";
export interface User {

  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: any;
}
