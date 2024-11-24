import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonComponent, ReactiveFormsModule, CommonModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder
  ){}
  ngOnInit()
  {
    this.loginForm = this.fb.group({
      email:[null , [Validators.required , Validators.email]],
      password:[null , [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        Validators.minLength(6)
      ]]
    })  
  }
  signIn()
  {
    console.log(this.loginForm.value);
  }
}
