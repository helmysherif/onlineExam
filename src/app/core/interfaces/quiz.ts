export interface QuizRes
{
  message:string;
  metadata:{
    currentPage:number;
    numberOfPages:number;
    limit:number;
  };
  subjects:{
    _id:string;
    name:string;
    icon:string;
    createdAt:string;
  }[]
}
export interface Quiz
{
  message:string;
  subjects:Subject[]
}
export interface Subject
{
  _id:string;
  name:string;
  icon:string;
  createdAt:string;
}