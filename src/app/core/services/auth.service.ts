import { Injectable } from '@angular/core';
import { AuthAPI } from '../base/AuthAPI';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoint } from '../enums/AuthAPI.endpoint';
import { AuthAPIAdapter } from '../adapters/auth-api.adapter';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAPI {
  constructor(
    private _HttpClient:HttpClient,
    private _AuthAPIAdapter:AuthAPIAdapter
  ){}
  login(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.LOGIN , data).pipe(
      map(res => this._AuthAPIAdapter.adapt(res)),
      catchError(error => of(error))
    );
  }
  register(data: any): Observable<any> {
    return this._HttpClient.post(AuthEndpoint.REGISTER , data).pipe(
      map(res => this._AuthAPIAdapter.adapt(res)),
      catchError(error => of([]))
    );
  }
}
