import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Exam } from '../../../../core/interfaces/exam';
import { ButtonComponent } from "../button/button.component";
@Component({
  selector: 'app-exam-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss'
})
export class ExamCardComponent {
  exam:InputSignal<Exam> = input.required<Exam>();
  showDialog:OutputEmitterRef<Exam> = output<Exam>();
  click()
  {
    this.showDialog.emit(this.exam());
  }
}
