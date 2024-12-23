import { Component, input, InputSignal, output, OutputEmitterRef, signal } from '@angular/core';
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
  buttonName:InputSignal<string> = input.required<string>();
  inputValue = signal("");
  searchInput()
  {
    this.search.emit(this.inputValue());
  }
  getSearchValue(e:Event)
  {
    const inputValue = (e.target as HTMLInputElement).value;
    this.inputValue.set(inputValue);
  }
}
