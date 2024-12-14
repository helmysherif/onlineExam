import { Injectable } from '@angular/core';
import { QuizAdapter } from '../interfaces/quizAdapt';
import { Quiz, QuizRes } from '../interfaces/quiz';
import { ExamAPIRes, ExamRes } from '../interfaces/exam';
import { QuestionAPIRes, QuestionRes } from '../interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class QuizAPIAdapter implements QuizAdapter {
  ExamQuestions(data: QuestionAPIRes): QuestionRes {
    return {
      message : data.message,
      questions : data.questions.map(q => {
        return {
          answers:q.answers,
          type:q.type,
          _id:q._id,
          question:q.question,
          correct:q.correct,
          selectedOption:'',
          index:0
        }
      })
    }
  }
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