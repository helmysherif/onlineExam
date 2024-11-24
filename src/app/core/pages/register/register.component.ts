import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { RouterLink } from '@angular/router';
import { matchPasswordValidator } from '../../../shared/components/business/form-validators';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonComponent, ReactiveFormsModule, CommonModule, ErrorMessageComponent , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder
  ){}
  ngOnInit()
  {
    this.registerForm = this.fb.group(
    {
      firstName:[null , [Validators.required]],
      lastName:[null , [Validators.required]],
      email:[null , [Validators.required , Validators.email]],
      password:[null , [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6)
      ]],
      confirmPassword:[null , [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6)
      ]]
    },{ validators:matchPasswordValidator('password' , 'confirmPassword') })
  }
  register()
  {
    console.log(this.registerForm.value);
  }
}
