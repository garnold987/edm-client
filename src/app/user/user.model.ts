import { Role } from "./role.model";
export interface User {

  id: number;
  username: string;
  password: string;
  enabled: boolean;
  roles: any;
}
