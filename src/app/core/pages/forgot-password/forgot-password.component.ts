import { Component } from '@angular/core';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRes } from '../../interfaces/forgotPassword';
import { Router } from '@angular/router';
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, CommonModule, FormInputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit()
  {
    this.forgotPasswordForm = this.fb.group({
      email : [null , [Validators.required , Validators.email]]
    })
  }
  forgotPassword()
  {
    if(this.forgotPasswordForm.valid)
    {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next : (res:ForgotPasswordRes) => {
          if(res)
          {
            sessionStorage.setItem("forgotedEmail" , this.forgotPasswordForm.value.email)
            this.router.navigateByUrl("/auth/verify-code")
          }
        }
      })
    }
  }
}
