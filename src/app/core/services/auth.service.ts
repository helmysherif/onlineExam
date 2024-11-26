import { Injectable } from '@angular/core';
import { AuthAPI } from '../base/AuthAPI';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoint } from '../enums/AuthAPI.endpoint';
import { AuthAPIAdapter } from '../adapters/auth-api.adapter';
import { RegisterUser } from '../interfaces/register';
import { RegisterAPIRes, RegisterRes } from '../interfaces/registerRes';
import { LoginUser } from '../interfaces/login';
import { LoginAPIRes, LoginRes } from '../interfaces/loginRes';
import { ForgotPasswordRes, UserForgotPassword } from '../interfaces/forgotPassword';
import { UserVerifyCode, VerifyCodeRes } from '../interfaces/verifyCode';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAPI {
  constructor(
    private _HttpClient:HttpClient,
    private _AuthAPIAdapter:AuthAPIAdapter
  ){}
  login(data:LoginUser): Observable<LoginRes |any> {
    return this._HttpClient.post<LoginAPIRes>(AuthEndpoint.LOGIN , data).pipe(
      map((res:LoginAPIRes) => this._AuthAPIAdapter.loginAdapter(res))
    );
  }
  register(data: RegisterUser): Observable<RegisterRes | any> {
    return this._HttpClient.post<RegisterAPIRes>(AuthEndpoint.REGISTER , data).pipe(
      map((res:RegisterAPIRes) => this._AuthAPIAdapter.registerAdapter(res))
    );
  }
  forgotPassword(data:UserForgotPassword): Observable<ForgotPasswordRes> {
    return this._HttpClient.post<ForgotPasswordRes>(AuthEndpoint.FORGOTPASSWORD , data).pipe(
      map((res:ForgotPasswordRes) => this._AuthAPIAdapter.forgotPasswordAdapter(res))
    );
  }
  verifyCode(data: UserVerifyCode): Observable<VerifyCodeRes> {
    return this._HttpClient.post<VerifyCodeRes>(AuthEndpoint.VERIFYCODE , data).pipe(
      map((res:VerifyCodeRes) => this._AuthAPIAdapter.verifyCode(res))
    );
  }
}
