import { Component, signal, WritableSignal } from '@angular/core';
import { QuizCardComponent } from '../../../shared/components/ui/quiz-card/quiz-card.component';
import { Quiz, QuizRes, Subject } from '../../interfaces/quiz';
import { QuizesService } from '../../services/quizes.service';
import {Subject as sub, takeUntil} from 'rxjs';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { SearchBarComponent } from "../../../shared/components/ui/search-bar/search-bar.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [QuizCardComponent, VirtualScrollerModule, SearchBarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private quizService: QuizesService , private router:Router) {}
  // subjects:Subject[] = [];
  subjects:WritableSignal<Subject[]> = signal([]);
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
          this.subjects.set(res.subjects)
        }
      }
    })
  }
  search(searchInput:string)
  {
    let isSubjectExists = this.subjects().filter(s => s.name.toLowerCase() === searchInput.toLowerCase())[0];
    if(isSubjectExists)
    {
      this.router.navigateByUrl(`/home/quiz/${isSubjectExists._id}`);
    }
  }
}
