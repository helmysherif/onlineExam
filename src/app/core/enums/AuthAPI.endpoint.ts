import { environment } from "../../../environments/environment.dev";
export class AuthEndpoint
{
  static REGISTER = `${environment.apiUrl}/auth/signup`;
  static LOGIN = `${environment.apiUrl}/auth/signin`;
  static FORGOTPASSWORD = `${environment.apiUrl}/auth/forgotPassword`;
  static VERIFYCODE = `${environment.apiUrl}/auth/verifyResetCode`;
  static RESETPASSWORD = `${environment.apiUrl}/auth/resetPassword`;
}