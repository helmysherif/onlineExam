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
  questions = [
    {
      answers: [
        {
          answer: 'Hyperlinks and Text Markup Language',
          key: 'A1',
        },
        {
          answer: 'Hyper Text Markup Language',
          key: 'A2',
        },
        {
          answer: 'Home Tool Markup Language',
          key: 'A3',
        },
      ],
      _id: '670082800a5849a4aee16294',
      selectedOption: '',
      question: 'What does HTML stand for?',
      correct: 'A2',
      index : 0
    },
    {
      answers: [
        {
          answer: 'Microsoft',
          key: 'A1',
        },
        {
          answer: 'Google',
          key: 'A2',
        },
        // {
        //   answer: 'Mozilla',
        //   key: 'A3',
        // },
        {
          answer: 'The World Wide Web Consortium',
          key: 'A3',
        },
      ],
      _id: '6700829e0a5849a4aee16297',
      selectedOption: '',
      question: 'Who is making the Web standards?',
      correct: 'A3',
      index : 0
    },
    {
      answers: [
        {
          answer: "<a href='url' new>",
          key: 'A1',
        },
        {
          answer: "<a href='url' target='new'>",
          key: 'A2',
        },
        {
          answer: "<a href='url' target='_blank'>",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'How can you open a link in a new tab/browser window?',
      correct: 'A3',
      selectedOption: '',
      index : 0
    },
    {
      answers: [
        {
          answer: "Java",
          key: 'A1',
        },
        {
          answer: "C++",
          key: 'A2',
        },
        {
          answer: "C#",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'Which of the following languages is used as a scripting language in the Unity 3D game engine?',
      correct: 'A3',
      selectedOption: '',
      index : 0
    },
    {
      answers: [
        {
          answer: "32 bits",
          key: 'A1',
        },
        {
          answer: "64 bits",
          key: 'A2',
        },
        {
          answer: "128 bits",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'How long is an IPv6 address?',
      correct: 'A3',
      selectedOption: '',
      index : 0
    },
    {
      answers: [
        {
          answer: "Internet as a Service",
          key: 'A1',
        },
        {
          answer: "Infrastructure as a Service",
          key: 'A2',
        },
        {
          answer: "Infrastructure as a Server",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'In the server hosting industry IaaS stands for...',
      correct: 'A2',
      selectedOption: '',
      index : 0
    },
    {
      answers: [
        {
          answer: "Comprehensive documentation",
          key: 'A1',
        },
        {
          answer: "Individuals and interactions",
          key: 'A2',
        },
        {
          answer: "Responding to change",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'Which of these is not a key value of Agile software development?',
      correct: 'A1',
      selectedOption: '',
      index : 0
    },
    {
      answers: [
        {
          answer: "LI Xiaoxia (China)",
          key: 'A1',
        },
        {
          answer: "DING Ning (China)",
          key: 'A2',
        },
        {
          answer: "Song KIM (North Korea)",
          key: 'A3',
        },
      ],
      _id: '670085a00a5849a4aee162af',
      question: 'Which female player won the gold medal of table tennis singles in 2016 Olympics Games?',
      correct: 'A2',
      selectedOption: '',
      index : 0
    }
  ];
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
  search(e: string) {
    console.log(e);
  }
  currentExam!: Exam;
  questionsDots: any[] = [];
  showInstructions(exam: Exam) {
    this.currentExam = exam;
    for (let index = 0; index < exam.numberOfQuestions; index++) {
      this.questionsDots.push({
        index: index,
        active: false,
      });
    }
    this.questionsDots[0].active = true;
    this.confirmationService.confirm({
      key: 'instructions',
      // key: 'score',
    });
  }
  startQuiz() {
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
    this.questions.forEach((q:any) => {
      q.selectedOption = null;
    })
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
    
  }
}
