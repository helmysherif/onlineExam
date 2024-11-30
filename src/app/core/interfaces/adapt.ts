import { ForgotPasswordRes } from "./forgotPassword";
import { LoginAPIRes, LoginRes } from "./loginRes";
import { RegisterAPIRes, RegisterRes } from "./registerRes";
import { ResetPasswordAPIRes, ResetPasswordRes } from "./resetPassword";
import { VerifyCodeRes } from "./verifyCode";
export interface Adapter {
  registerAdapter(data:RegisterAPIRes):RegisterRes;
  loginAdapter(data:LoginAPIRes):LoginRes;
  forgotPasswordAdapter(data:ForgotPasswordRes):ForgotPasswordRes;
  verifyCode(data:VerifyCodeRes):VerifyCodeRes;
  resetPassword(data:ResetPasswordAPIRes):ResetPasswordRes;
}
