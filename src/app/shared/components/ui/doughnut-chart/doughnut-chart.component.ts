import { Component, input, InputSignal } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent {
  data: any;
  options: any;
  scoreNumber:InputSignal<number> = input.required<number>()
  ngOnInit() {
    //20
    this.data = {
      datasets: [
        {
          data: [this.scoreNumber() , 100 - this.scoreNumber()],
          borderRadius: 10,
          borderWidth: 7,
          borderColor: '#FFFFFF',
          backgroundColor: ['#02369C', '#CC1010']
        },
      ],
    };

    this.options = {
      cutout: '80%',
      aspectRatio: 2,
      plugins: {
        tooltip: {
          enabled: false
        },
      },
    };
  }
}
