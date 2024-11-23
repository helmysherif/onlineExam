import { Routes } from '@angular/router';

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
    ]
  }
];
