import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizAdapter } from '../interfaces/quizAdapt';
import { QuizAPI } from '../base/QuizAPI';
import { map, Observable } from 'rxjs';
import { Quiz, QuizRes } from '../interfaces/quiz';
import { QuizEndpoint } from '../enums/QuizAPI.endpoint';
import { QuizAPIAdapter } from '../adapters/quiz-api.adapter';
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
}
