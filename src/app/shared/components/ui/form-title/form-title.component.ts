import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-title',
  standalone: true,
  imports: [],
  templateUrl: './form-title.component.html',
  styleUrl: './form-title.component.scss'
})
export class FormTitleComponent {
  text:InputSignal<string> = input.required<string>()
}
