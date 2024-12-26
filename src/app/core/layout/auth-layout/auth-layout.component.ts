import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CookieService } from 'ngx-cookie-service';
interface Language {
  name: string;
  code: string;
}
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet , DropdownModule , CommonModule , FormsModule , RouterModule ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  languages:Language[] = [];
  selectedLang!:Language;
  constructor(
    private router:Router,
    private cookie:CookieService,
  ){}
  ngOnInit() {
    this.languages = [
      { name: 'English', code: 'en' },
      { name: 'Arabic', code: 'ar' },
    ];
    this.selectedLang = this.languages[0];
  }
  loginWithGoogle(response:any)
  {
    this.cookie.set("onlineExamToken" , response.credential);
    this.router.navigateByUrl("/home")
  }
}
