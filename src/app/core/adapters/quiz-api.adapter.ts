import { Injectable } from '@angular/core';
import { QuizAdapter } from '../interfaces/quizAdapt';
import { Quiz, QuizRes } from '../interfaces/quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizAPIAdapter implements QuizAdapter {
  Quizes(data:QuizRes): Quiz {
    return {
      message : data.message,
      subjects : data.subjects
    }
  }
}