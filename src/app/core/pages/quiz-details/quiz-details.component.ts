import { Component, input, InputSignal } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/ui/search-bar/search-bar.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { QuizesService } from '../../services/quizes.service';
import { Exam } from '../../interfaces/exam';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ExamCardComponent } from '../../../shared/components/ui/exam-card/exam-card.component';
import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DoughnutChartComponent } from "../../../shared/components/ui/doughnut-chart/doughnut-chart.component";
import { Question, QuestionRes } from '../../interfaces/question';
@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [
    SearchBarComponent,
    ButtonComponent,
    ConfirmDialogModule,
    ExamCardComponent,
    TimerComponent,
    RadioButtonModule,
    FormsModule,
    DoughnutChartComponent
],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss',
  providers: [ConfirmationService],
})
export class QuizDetailsComponent {
  id: InputSignal<string> = input<string>('');
  endSubs$: Subject<any> = new Subject();
  isEmpty: boolean = false;
  answer2: any;
  currentQuestionIndex: number = 0;
  correctQuestions:any[] = [];
  selectedAnswer:any;
  questions:Question[] = [];
  wrongQuestions:Question[] = [];
  exams: Exam[] = [];
  constructor(
    private quizService: QuizesService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnDestroy() {
    this.endSubs$.complete();
  }
  ngOnInit() {
    console.log(this.id());
    this.getAllExams(this.id());
  }
  private getAllExams(subjectId: string) {
    this.quizService
      .QuizeExams(subjectId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.exams = res.exams;
            if (this.exams.length === 0) {
              this.isEmpty = true;
            }
          }
        },
      });
  }

  currentExam!: Exam;
  questionsDots: any[] = [];
  showInstructions(exam: Exam) {
    this.currentExam = exam;
    console.log(this.currentExam);
    this.confirmationService.confirm({
      key: 'instructions',
      // key: 'score',
    });
  }
  startQuiz() {
    console.log(this.currentExam);
    this.quizService.ExamQuestions(this.currentExam._id).subscribe({
      next : (res:QuestionRes) => {
        console.log(res);
        if(res.message === 'success')
        {
          this.questions = res.questions;
          for (let index = 0; index < res.questions.length; index++) {
            this.questionsDots.push({
              index: index,
              active: false,
            });
          }
          if(this.questionsDots[0])
          {
            this.questionsDots[0].active = true;
          }
        }
      }
    })
    this.confirmationService.confirm({
      key: 'exam',
    });
  }
  calculateTotalScore()
  {
    this.questions.forEach((q:any) => {
      if(q.selectedOption && q.selectedOption === q.correct)
      {
        this.correctQuestions.push({
          id : q._id,
          selectedOption : q.selectedOption,
          correct : q.correct
        })
      }
    })
    this.totalScore = Math.round((this.correctQuestions.length / this.questions.length) * 100)
  }
  timerComplete(e: boolean , examPopup:any) {
    if (e) {
      // this.confirmationService.close();
      this.questionsDots = [];
      examPopup.hide();
      this.calculateTotalScore();
      this.confirmationService.confirm({
        key: 'score',
      });
    }
  }
  closeTotalScore(score:any)
  {
    this.totalScore = 0;
    this.correctQuestions = [];
    this.questions.forEach((q:any) => {
      q.selectedOption = null;
    })
    this.currentQuestionIndex = 0;
    score.hide();
  }
  selectValue(e:any)
  {
    this.selectedAnswer = e;
    this.questions[this.currentQuestionIndex].index = this.questions[this.currentQuestionIndex].answers.indexOf(this.selectedAnswer);
  }
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.questionsDots.forEach(q => {
        if(q.index === this.currentQuestionIndex + 1)
        {
          q.active = false;
        }
      })
    }
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
    this.questionsDots.forEach((q) => {
      if (q.index === this.currentQuestionIndex) {
        q.active = true;
      }
    });
  }
  totalScore:number = 0;
  calculateCorrectAnswers(examPopup:any)
  {
    this.correctQuestions = []
    this.calculateTotalScore();
    this.questionsDots = [];
    this.currentQuestionIndex = 0;
    // this.questions.forEach((q:any) => {
    //   q.selectedOption = null;
    // })
    examPopup.hide();
    this.confirmationService.confirm({
      key: 'score',
    });
  }
  currentAnswerIndex:number = 0;
  getCurrentAnswer(index:number)
  {
    this.currentAnswerIndex = index;
  }
  showResults()
  {
    this.wrongQuestions = this.questions.filter(q => q.selectedOption !== q.correct);
    console.log(this.questions);
    console.log(this.wrongQuestions);
    this.confirmationService.confirm({
      key: 'show-results',
    });
  }
  closeShowResults()
  {
    this.questions.forEach((q:any) => {
      q.selectedOption = null;
    })
  }
  search(searchedExam: string) {
    let selectedExam = this.exams.filter(e => e.title.toLowerCase() === searchedExam.toLowerCase())[0];
    if(selectedExam)
    {
      this.showInstructions(selectedExam)
    }
  }
}
