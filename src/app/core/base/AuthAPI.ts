import { Observable } from "rxjs";
import { RegisterUser } from "../interfaces/register";
import { RegisterRes } from "../interfaces/registerRes";
import { LoginUser } from "../interfaces/login";
import { LoginRes } from "../interfaces/loginRes";
import { ForgotPasswordRes, UserForgotPassword } from "../interfaces/forgotPassword";
import { UserVerifyCode, VerifyCodeRes } from "../interfaces/verifyCode";
import { ResetPassword, ResetPasswordRes } from "../interfaces/resetPassword";
import { LogoutRes } from "../interfaces/logout";
export abstract class AuthAPI
{
  abstract login(data:LoginUser):Observable<LoginRes>;
  abstract register(data:RegisterUser):Observable<RegisterRes>;
  abstract forgotPassword(data:UserForgotPassword):Observable<ForgotPasswordRes>;
  abstract verifyCode(data:UserVerifyCode):Observable<VerifyCodeRes>;
  abstract resetPassword(data:ResetPassword):Observable<ResetPasswordRes>;
  abstract logout():Observable<LogoutRes>;
}