import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, numberAttribute, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  buttonName:InputSignal<string> = input.required<string>();
  buttonType:InputSignal<string> = input<string>('button');
  background:InputSignal<string> = input.required<string>();
  disabled:InputSignal<boolean> = input<boolean>(false);
  color:InputSignal<string> = input.required<string>();
  borderColor:InputSignal<string> = input<string>('');
  borderRadius:InputSignal<number> = input<number>(15);
  width:InputSignal<number> = input<number>(100);
  onClick:OutputEmitterRef<void> = output<void>();
  clickOnBtn()
  {
    this.onClick.emit();
  }
}
