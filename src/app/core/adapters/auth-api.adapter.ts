import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapt';
import { RegisterAPIRes, RegisterRes } from '../interfaces/registerRes';
import { LoginAPIRes, LoginRes } from '../interfaces/loginRes';
import { ForgotPasswordRes } from '../interfaces/forgotPassword';
import { VerifyCodeRes } from '../interfaces/verifyCode';
@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdapter implements Adapter {
  constructor(){}
  registerAdapter(data:RegisterAPIRes):RegisterRes
  {
    return {
      message : data.message,
      token : data.token,
      userEmail : data.user.email
    }
  }
  loginAdapter(data:LoginAPIRes):LoginRes
  {
    return {
      message : data.message,
      token : data.token,
      userEmail : data.user.email
    }
  }
  forgotPasswordAdapter(data: ForgotPasswordRes):ForgotPasswordRes {
    return {
      message:data.message,
      info:data.info
    }
  }
  verifyCode(data: VerifyCodeRes): VerifyCodeRes {
    return {
      status : data.status
    } 
  }
}
