import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
interface Language {
  name: string;
  code: string;
}
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet , DropdownModule , CommonModule , FormsModule , RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  languages:Language[] = [];
  selectedLang!:Language;
  ngOnInit() {
    this.languages = [
      { name: 'English', code: 'en' },
      { name: 'Arabic', code: 'ar' },
    ];
    this.selectedLang = this.languages[0];
  }
}
