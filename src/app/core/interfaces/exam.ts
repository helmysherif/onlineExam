export interface ExamAPIRes
{
  message:string;
  metadata:{
    currentPage:number;
    numberOfPages:number;
    limit:number;
  };
  exams:Exam[]
}
export interface Exam
{ 
  _id:string;
  title:string;
  duration:number;
  subject:string;
  numberOfQuestions:number;
  active:boolean;
  createdAt:string;
}
export interface ExamRes
{
  message:string;
  exams:Exam[];
}