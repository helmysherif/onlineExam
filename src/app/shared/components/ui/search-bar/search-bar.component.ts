import { Component, output, OutputEmitterRef } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  search:OutputEmitterRef<string> = output<string>();
  searchInput(e:any)
  {
    this.search.emit(e.target.value);
  }
}
