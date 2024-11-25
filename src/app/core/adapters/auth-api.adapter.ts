import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapt';
@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdapter implements Adapter {
  constructor(){}
  adapt(data:any)
  {
    return {
      message : data.message,
      token : data.token,
      userEmail : data.user.email
    }
  }
}
