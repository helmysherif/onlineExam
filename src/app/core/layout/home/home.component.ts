import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/components/ui/sidebar/sidebar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SidebarLinks } from '../../interfaces/sidebar';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private authService:AuthService,
    private router:Router,
    private cookie:CookieService
  ){
    console.log(window.innerWidth);
    
  }
  sidebarLinks:SidebarLinks[] = [
    {
      title : "dashboard",
      url : "dashboard",
      image : "images/dashboard-page.svg"
    },
    {
      title : "quiz history",
      url : "quiz-history",
      image : "images/quiz.svg"
    },
    {
      title : "logout",
      image : "images/logout.svg"
    },
  ]
  logout()
  {
    this.authService.logout().subscribe({
      next : (res) => {
        if(res.message === 'success')
        {
          const onlineExamToken = this.cookie.get("onlineExamToken")
          if(onlineExamToken)
          {
            this.cookie.delete("onlineExamToken");
            this.router.navigateByUrl("/");
          }
        }
      }
    })
  }
}
