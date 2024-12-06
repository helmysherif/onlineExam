import { Observable } from "rxjs";
import { Quiz, QuizRes } from "../interfaces/quiz";
export abstract class QuizAPI
{
  abstract Quizes():Observable<Quiz>;
}