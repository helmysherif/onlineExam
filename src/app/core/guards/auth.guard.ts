import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('onlineExamToken');
  const router = inject(Router);
  if(token)
  {
    return true;
  } else {
    router.navigateByUrl("/");
    return false;
  }
};
