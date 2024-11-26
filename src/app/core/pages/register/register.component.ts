import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { Router, RouterLink } from '@angular/router';
import { matchPasswordValidator } from '../../../shared/components/business/form-validators';
import { AuthService } from '../../services/auth.service';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonComponent, ReactiveFormsModule, CommonModule, ErrorMessageComponent, RouterLink, FormTitleComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit()
  {
    this.registerForm = this.fb.group(
    {
      firstName:[null , [Validators.required]],
      lastName:[null , [Validators.required]],
      username:[null , [Validators.required]],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email:[null , [Validators.required , Validators.email]],
      password:[null , [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6)
      ]],
      rePassword:[null , [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6)
      ]]
    },{ validators:matchPasswordValidator })
  }
  register()
  {
    // console.log(this.registerForm);
    // console.log(this.registerForm.get("confirmPassword")?.hasError("mismatch"));
    // console.log(this.registerForm.value);
    if(this.registerForm.valid)
    {
      this.authService.register(this.registerForm.value).subscribe({
        next : (res) => {
          if(res)
          {
            this.router.navigateByUrl("/auth/login")
          }
        }
      })
    }
  }
}
