import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const onlineExamToken = cookie.get("onlineExamToken");
  if(onlineExamToken)
  {
    const excludedUrls = ['/auth/signup' , '/auth/signin' , '/auth/forgotPassword' , '/auth/verifyResetCode' , '/auth/resetPassword'];
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    if(isExcluded)
    {
      return next(req);
    }
    const authReq = req.clone({
      setHeaders: {
        token: `${onlineExamToken}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
