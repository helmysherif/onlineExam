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
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormTitleComponent, InputTextModule, ReactiveFormsModule, ButtonComponent, ErrorMessageComponent , CommonModule],
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
      console.log(this.forgotPasswordForm.value);
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next : (res:ForgotPasswordRes) => {
          if(res)
          {
            this.router.navigateByUrl("/auth/verify-code")
          }
        }
      })
    }
  }
}
