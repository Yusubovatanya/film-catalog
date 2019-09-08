import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../service/messages.service';
import { RegistrationComponent } from 'src/app/film-catalog/registration/registration.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<RegistrationComponent> {

  constructor(private msgService: MessagesService) {
  }

  canDeactivate(registrationComponent: RegistrationComponent): Observable<boolean> {
    if (registrationComponent.editInProgress) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Вы точно хотите покинуть страницу, не сохранив изменения?',
        action: true
      });
      return this.msgService.getSubmit();
    }
    return of(true);
  }

}
