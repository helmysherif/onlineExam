import { Component, input, InputSignal } from '@angular/core';
import { Subject } from '../../../../core/interfaces/quiz';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent {
  quiz:InputSignal<Subject> = input.required<Subject>()
}
