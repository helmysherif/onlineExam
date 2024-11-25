import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path : "",
    redirectTo : "auth",
    pathMatch : "full"
  },
  {
    path : "auth",
    loadComponent : () => import("./core/layout/auth-layout/auth-layout.component").then(m => m.AuthLayoutComponent),
    children : [
      {
        path : "",
        redirectTo : "login",
        pathMatch : "full"
      },
      {
        path : "login",
        loadComponent : () => import("./core/pages/login/login.component").then(m => m.LoginComponent)
      },
      {
        path : "register",
        loadComponent : () => import("./core/pages/register/register.component").then(m => m.RegisterComponent)
      },
      {
        path : "forgot-password",
        loadComponent : () => import("./core/pages/forgot-password/forgot-password.component").then(m => m.ForgotPasswordComponent)
      },
      {
        path : "verify-code",
        loadComponent : () => import("./core/pages/verify-code/verify-code.component").then(m => m.VerifyCodeComponent)
      },
      {
        path : "reset-password",
        loadComponent : () => import("./core/pages/reset-password/reset-password.component").then(m => m.ResetPasswordComponent)
      },
    ]
  },
  {
    path : "dashboard",
    loadComponent : () => import("./core/layout/dashboard-layout/dashboard-layout.component").then(m => m.DashboardLayoutComponent),
    canActivate : [AuthGuard]
  }
];
