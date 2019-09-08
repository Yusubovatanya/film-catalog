import { Component, OnInit, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() upto: number;
  percentage: number = 0;
  progress: number = 0;
  dasharray: string = '0, 1000';
  input_percentage: number;
  radius: number = 30;
  sleep: Subscription;
  constructor() { }

  ngOnInit() {
    this.showProgress();
  }

  showProgress() {
    this.upto = (this.upto > 100) ? 100 : ((this.upto < 0) ? 0 : this.upto);
    this.input_percentage = (this.upto / 100) * (2 * Math.PI * this.radius);
    this.sleep = interval(25).subscribe((i) => {
      this.animateCircle();
    })
  }

  animateCircle() {
    this.percentage = (this.progress / 100) * (2 * Math.PI * this.radius);
    if (this.percentage >= this.input_percentage) {
      this.sleep.unsubscribe()
    } else {
      this.progress++;//1
      this.dasharray = `${this.percentage}, 1000`;
    }
  }

  ngOnDestroy(): void {
    this.sleep.unsubscribe()
  }

}


