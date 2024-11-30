import { Component } from '@angular/core';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRes } from '../../interfaces/forgotPassword';
import { Router } from '@angular/router';
import { VerifyCodeRes } from '../../interfaces/verifyCode';
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, CommonModule, FormInputComponent , ToastModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
  providers : [MessageService]
})
export class VerifyCodeComponent {
  verifyCodeForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private messageService: MessageService
  ){}
  ngOnInit()
  {
    this.verifyCodeForm = this.fb.group({
      resetCode : [null , [Validators.required]]
    })
  }
  resendCode()
  {
    const forgotedEmail = sessionStorage.getItem("forgotedEmail");
    if(forgotedEmail)
    {
      const data = {
        email : forgotedEmail
      }
      this.authService.forgotPassword(data).subscribe({
        next : (res:ForgotPasswordRes) => {
          if(res.message)
          {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'the code is sent successfully!' });
          }
        }
      })
    }
  }
  verifyCode()
  {
    if(this.verifyCodeForm.valid)
    {
      console.log(this.verifyCodeForm.value);
      this.authService.verifyCode(this.verifyCodeForm.value).subscribe({
        next : (res:VerifyCodeRes) => {
          if(res)
          {
            this.router.navigateByUrl("/auth/reset-password")
          }
        }
      })
    }
  }
}
