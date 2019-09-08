import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSpinnerService {

  private spinnerService = new BehaviorSubject<boolean>(true);
  spinnerShowHide$ = this.spinnerService.asObservable();

  showOrHideSpinner(value: boolean) {
    this.spinnerService.next(value);
  }
 
}
