import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  startDuration:InputSignal<number> = input.required<number>();
  minutes: number = 0;
  seconds: number = 0;
  private interval: any;
  timerComplete:OutputEmitterRef<boolean> = output<boolean>();
  ngOnInit(): void {
    this.minutes = this.startDuration();
    this.startTimer();
  }
  startTimer()
  {
    let totalSeconds = this.startDuration() * 60;
    // let totalSeconds = 15;
    this.interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        this.minutes = Math.floor(totalSeconds / 60);
        this.seconds = totalSeconds % 60;
        this.timerComplete.emit(false);
      } else {
        this.timerComplete.emit(true);
        clearInterval(this.interval);
      }
    }, 1000);
  }
  getTimerColor(): string {
    const totalSeconds = this.minutes * 60 + this.seconds;
    if (totalSeconds < 10) {
      return 'red';
    }
    return '#11CE19';
  }
  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
  padNumber(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
