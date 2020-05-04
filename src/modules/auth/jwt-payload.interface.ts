import { RoleType } from '../role/roletype.enum';

export interface IJwtPayload {
  id: number;
  email: string;
  roles: RoleType[];
  iat?: Date;
}
