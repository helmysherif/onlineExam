import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
export const handlingErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.error?.message || 'An unexpected error occurred',
      });
      if(error?.error?.message === "invalid token .. login again")
      {
        localStorage.removeItem("onlineExamToken");
        router.navigateByUrl("/");
      }
      return throwError(() => error);
    })
  )
};
