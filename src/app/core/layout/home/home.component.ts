import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/components/ui/sidebar/sidebar.component";
import { Router, RouterOutlet } from '@angular/router';
import { SidebarLinks } from '../../interfaces/sidebar';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";

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
    private router:Router
  ){}
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
          this.router.navigateByUrl("/");
          if(localStorage.getItem("onlineExamToken"))
          {
            localStorage.removeItem("onlineExamToken")
          }
        }
      }
    })
  }
}
