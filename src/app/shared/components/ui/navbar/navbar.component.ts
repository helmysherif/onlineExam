import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarLinks } from '../../../../core/interfaces/sidebar';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidebarModule , RouterLink , RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  sidebarVisible = false;
  sidebarLinks:InputSignal<SidebarLinks[]> = input.required<SidebarLinks[]>();
  logout:OutputEmitterRef<void> = output<void>();
  logoutFun()
  {
    this.logout.emit();
    this.sidebarVisible = false;
  }
}
