import { environment } from "../../../environments/environment.dev";
export class AuthEndpoint
{
  static REGISTER = `${environment.apiUrl}/auth/signup`;
  static LOGIN = `${environment.apiUrl}/auth/signin`;
}