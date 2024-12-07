import { Component } from '@angular/core';
import { QuizCardComponent } from '../../../shared/components/ui/quiz-card/quiz-card.component';
import { Quiz, QuizRes, Subject } from '../../interfaces/quiz';
import { QuizesService } from '../../services/quizes.service';
import {Subject as sub, takeUntil} from 'rxjs';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { SearchBarComponent } from "../../../shared/components/ui/search-bar/search-bar.component";
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [QuizCardComponent, VirtualScrollerModule, SearchBarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private quizService: QuizesService) {}
  subjects:Subject[] = [];
  endSubs$:sub<any> = new sub();
  ngOnInit() {
    this.getAllQuizes();
  }
  ngOnDestroy()
  {
    this.endSubs$.complete();
  }
  private getAllQuizes() {
    this.quizService.Quizes().pipe(takeUntil(this.endSubs$)).subscribe({
      next : (res:Quiz) => {
        if(res.message === 'success')
        {
          this.subjects = res.subjects;
        }
      }
    })
  }
  search(e:string)
  {
    console.log(e);
  }
}
