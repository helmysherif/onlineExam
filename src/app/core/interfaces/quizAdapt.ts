import { ExamAPIRes, ExamRes } from "./exam";
import { QuestionAPIRes, QuestionRes } from "./question";
import { Quiz, QuizRes } from "./quiz";
export interface QuizAdapter {
  Quizes(data:QuizRes):Quiz;
  QuizExams(data:ExamAPIRes):ExamRes;
  ExamQuestions(data:QuestionAPIRes):QuestionRes;
}