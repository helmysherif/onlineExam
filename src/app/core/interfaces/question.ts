import { Exam } from "./exam";
import { Subject } from "./quiz";
export interface QuestionAPIRes
{
    message:string;
    questions:QestionRes[]
}
export interface QestionRes
{
    answers:Answer[];
    type:string;
    _id:string;
    question:string;
    correct:string;
    subject:Subject;
    exam:Exam;
    createdAt:string;
}
export interface Answer
{
    answer:string;
    key:string;
}
export interface Question
{
    answers:Answer[];
    type:string;
    _id:string;
    question:string;
    correct:string;
    selectedOption:string | null;
    index:number | null;
}
export interface QuestionRes
{
    message:string;
    questions:Question[]
}