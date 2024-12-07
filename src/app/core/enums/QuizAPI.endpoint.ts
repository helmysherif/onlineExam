import { environment } from "../../../environments/environment.dev";
export class QuizEndpoint
{
  static QUIZES = `${environment.apiUrl}/subjects`;
  static QUIZEEXAMS = `${environment.apiUrl}/exams?subject=`;
}