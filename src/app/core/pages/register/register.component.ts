import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { matchPasswordValidator, noSpacesValidator } from '../../../shared/components/business/form-validators';
import { AuthService } from '../../services/auth.service';
import { FormTitleComponent } from "../../../shared/components/ui/form-title/form-title.component";
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonComponent, ReactiveFormsModule, CommonModule, RouterLink, FormTitleComponent, FormInputComponent],
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
      firstName:[null , [Validators.required , noSpacesValidator]],
      lastName:[null , [Validators.required , noSpacesValidator]],
      username:[null , [Validators.required , noSpacesValidator]],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) , noSpacesValidator]],
      email:[null , [Validators.required , Validators.email , noSpacesValidator]],
      password:[null , [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6) , noSpacesValidator
      ]],
      rePassword:[null , [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6) , noSpacesValidator
      ]]
    },{ validators:matchPasswordValidator })
  }
  register()
  {
    // console.log(this.registerForm);
    // console.log(this.registerForm.get("confirmPassword")?.hasError("mismatch"));
    console.log(this.registerForm.value);
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
