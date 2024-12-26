import { LoginRes } from './../../interfaces/loginRes';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonComponent, ReactiveFormsModule, CommonModule, RouterLink, FormTitleComponent, FormInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private cookie:CookieService,
  ){}
  ngOnInit()
  {
    this.loginForm = this.fb.group({
      email:[null , [Validators.required , Validators.email]],
      password:[null , [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        Validators.minLength(6)
      ]]
    })
  }
  signIn()
  {
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next : (res:LoginRes) => {
          if(res)
          {
            // localStorage.setItem("onlineExamToken" , res.token)
            this.cookie.set("onlineExamToken" , res.token);
            this.router.navigateByUrl("/home")
          }
        }
      })
    }
  }
}
