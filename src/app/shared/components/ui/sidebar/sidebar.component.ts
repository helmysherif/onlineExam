import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SidebarLinks } from '../../../../core/interfaces/sidebar';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarLinks:InputSignal<SidebarLinks[]> = input.required<SidebarLinks[]>();
  logout:OutputEmitterRef<void> = output<void>();
  logoutFun()
  {
    this.logout.emit();
  }
}