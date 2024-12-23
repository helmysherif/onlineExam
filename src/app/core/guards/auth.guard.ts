import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const AuthGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const onlineExamToken = cookie.get("onlineExamToken");
  const router = inject(Router);
  if(onlineExamToken)
  {
    return true;
  } else {
    router.navigateByUrl("/");
    return false;
  }
};
