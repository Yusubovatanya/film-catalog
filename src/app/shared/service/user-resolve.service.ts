import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any> {

  constructor(
    private userService: UserService
  ) { }
  resolve() {
    if (
      !this.userService.filmFavoriteListService.length
      && !this.userService.filmBookMarkListService.length
      && !this.userService.account_id
    ) {
      return this.userService.getUser().pipe(
        switchMap(userData => {
          return forkJoin(
            of(userData),
            this.userService.getFavoriteFilmsService(),
            this.userService.getBookMarkFilmsService()
          )
        })
      )
    }
  }
}


