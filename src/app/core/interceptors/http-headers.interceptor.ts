import { HttpInterceptorFn } from '@angular/common/http';
export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem("onlineExamToken"))
  {
    const excludedUrls = ['/auth/signup' , '/auth/signin' , '/auth/forgotPassword' , '/auth/verifyResetCode' , '/auth/resetPassword'];
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    if(isExcluded)
    {
      return next(req);
    }
    const token = localStorage.getItem("onlineExamToken");
    const authReq = req.clone({
      setHeaders: {
        token: `${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
