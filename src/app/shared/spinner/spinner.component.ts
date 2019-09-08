import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isSpinnerValue: boolean;
  subscription$: Subscription;

  constructor(public appSpinnerService: AppSpinnerService) {
    this.subscription$ = appSpinnerService.spinnerShowHide$.subscribe(
      value => {
        this.isSpinnerValue = value;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription$.unsubscribe();  
  }

}
