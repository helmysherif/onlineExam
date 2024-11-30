import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, InputSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, InputTextModule, ErrorMessageComponent , PasswordModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  value: string = '';
  isDisabled: boolean = false;
  placeholder:InputSignal<string> = input.required<string>();
  type:InputSignal<string> = input.required<string>();
  id:InputSignal<string> = input.required<string>();
  errors:InputSignal<any> = input<any>();
  private onChange = (value: string) => {};
  private onTouched = () => {};
  setValue(event:Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value
    this.onChange(this.value);
  }
  writeValue(value: string): void {
    this.value = value || '';
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  isTouched:boolean = false;
  // Trigger touched state
  markAsTouched(): void {
    this.onTouched();
    this.isTouched = true;
  }
}
