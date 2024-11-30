import { Component } from '@angular/core';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { VerifyCodeRes } from '../../interfaces/verifyCode';
import { PasswordModule } from 'primeng/password';
import { matchPasswordValidator } from '../../../shared/components/business/form-validators';
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, CommonModule, PasswordModule, FormInputComponent , ConfirmDialogModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers : [ConfirmationService]
})
export class ResetPasswordComponent {
  setPasswordForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private confirmationService: ConfirmationService
  ){}
  ngOnInit()
  {
    this.setPasswordForm = this.fb.group({
      newPassword : [null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) , Validators.minLength(6)]],
      rePassword : [null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) , Validators.minLength(6)]]
    } , { validators:matchPasswordValidator })
  }
  gotoLogin()
  {
    this.router.navigateByUrl("/auth/login")
  }
  resetPassword()
  {
    if(this.setPasswordForm.valid)
    {
      const forgotedEmail = sessionStorage.getItem("forgotedEmail");
      if(forgotedEmail)
      {
        const data = {
          email : forgotedEmail,
          newPassword : this.setPasswordForm.value.newPassword
        }
        console.log(data);
        this.authService.resetPassword(data).subscribe({
          next : (res) => {
            if(res.message === 'success')
            {
              this.confirmationService.confirm({
                key : "reset-password-success",
                accept: () => {},
                reject: () => {}
              });
            }
          }
        })
      }
    }
  }
}
