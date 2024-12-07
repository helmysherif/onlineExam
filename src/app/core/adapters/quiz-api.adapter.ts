import { Injectable } from '@angular/core';
import { QuizAdapter } from '../interfaces/quizAdapt';
import { Quiz, QuizRes } from '../interfaces/quiz';
import { ExamAPIRes, ExamRes } from '../interfaces/exam';
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
  QuizExams(data: ExamAPIRes): ExamRes {
    return {
      message : data.message,
      exams : data.exams
    } 
  }
}