import { JwtResponse } from '../types/jwt-response.types';
import { UserRoles } from '../types/user-roles.types';

const isSuperUserUtils = (jwt: JwtResponse): boolean => jwt.role === UserRoles.SuperUser;

export default isSuperUserUtils;
