import { ExamAPIRes, ExamRes } from "./exam";
import { Quiz, QuizRes } from "./quiz";
export interface QuizAdapter {
  Quizes(data:QuizRes):Quiz;
  QuizExams(data:ExamAPIRes):ExamRes;
}