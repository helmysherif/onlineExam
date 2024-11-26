import { Component } from '@angular/core';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRes } from '../../interfaces/forgotPassword';
import { Router } from '@angular/router';
import { VerifyCodeRes } from '../../interfaces/verifyCode';
import { PasswordModule } from 'primeng/password';
import { matchPasswordValidator } from '../../../shared/components/business/form-validators';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, ErrorMessageComponent , CommonModule , PasswordModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  setPasswordForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit()
  {
    this.setPasswordForm = this.fb.group({
      newPassword : [null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) , Validators.minLength(6)]],
      rePassword : [null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) , Validators.minLength(6)]]
    } , { validators:matchPasswordValidator })
  }
  resetPassword()
  {
    if(this.setPasswordForm.valid)
    {
      console.log(this.setPasswordForm.value);
      // this.authService.verifyCode(this.verifyCodeForm.value).subscribe({
      //   next : (res:VerifyCodeRes) => {
      //     if(res)
      //     {
      //       this.router.navigateByUrl("/auth/reset-password")
      //     }
      //   }
      // })
    }
  }
}
