import { Observable } from "rxjs";
import { Quiz, QuizRes } from "../interfaces/quiz";
import { ExamRes } from "../interfaces/exam";
import { QuestionRes } from "../interfaces/question";
export abstract class QuizAPI
{
  abstract Quizes():Observable<Quiz>;
  abstract QuizeExams(subjectId:string):Observable<ExamRes>;
  abstract ExamQuestions(examId:string):Observable<QuestionRes>;
}