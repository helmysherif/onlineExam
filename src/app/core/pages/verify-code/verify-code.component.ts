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
@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, ErrorMessageComponent , CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  verifyCodeForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit()
  {
    this.verifyCodeForm = this.fb.group({
      resetCode : [null , [Validators.required]]
    })
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
