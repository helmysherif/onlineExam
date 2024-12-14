import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizAdapter } from '../interfaces/quizAdapt';
import { QuizAPI } from '../base/QuizAPI';
import { map, Observable } from 'rxjs';
import { Quiz, QuizRes } from '../interfaces/quiz';
import { QuizEndpoint } from '../enums/QuizAPI.endpoint';
import { QuizAPIAdapter } from '../adapters/quiz-api.adapter';
import { ExamAPIRes, ExamRes } from '../interfaces/exam';
import { QuestionAPIRes, QuestionRes } from '../interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class QuizesService implements QuizAPI {
  constructor(
    private _HttpClient:HttpClient,
    private _QuizAdapter:QuizAPIAdapter
  ){}
  Quizes(): Observable<Quiz> {
    return this._HttpClient.get<QuizRes>(QuizEndpoint.QUIZES).pipe(
      map((res:QuizRes) => this._QuizAdapter.Quizes(res))
    );
  }
  QuizeExams(subjectId:string): Observable<ExamRes> {
    return this._HttpClient.get<ExamAPIRes>(`${QuizEndpoint.QUIZEEXAMS}${subjectId}`).pipe(
      map((res:ExamAPIRes) => this._QuizAdapter.QuizExams(res))
    );
  }
  ExamQuestions(examId:string):Observable<QuestionRes>
  {
    return this._HttpClient.get<QuestionAPIRes>(`${QuizEndpoint.EXAMQUESTIONS}${examId}`).pipe(
      map((res:QuestionAPIRes) => this._QuizAdapter.ExamQuestions(res))
    );
  }
}
