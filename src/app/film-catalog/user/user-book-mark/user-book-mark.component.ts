import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { UserService } from '../../../shared/service/user.service';
import { Film } from 'src/app/shared/models/film.model';
import { PagingService } from 'src/app/shared/service/paging.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-book-mark',
  templateUrl: './user-book-mark.component.html',
  styleUrls: ['./user-book-mark.component.css']
})
export class UserBookMarkComponent implements OnInit {
  filmBookMarkList: Film[] = [];
  filmFavoriteListService: Film[] = [];
  filmBookMarkListService: Film[] = [];
  count_marks: number;
  itemsOnPage: number = 12;
  result = true;
  errorMessage = '';
  lastPage: boolean;

  constructor(
    private userService: UserService,
    public appSpinnerService: AppSpinnerService,
    public pagingService: PagingService
  ) { }

  ngOnInit() {
    this.getBookMarkFilms();
  }

  getBookMarkFilms(): void {
    this.pagingService.initPaging()
    this.filmBookMarkListService = this.userService.filmBookMarkListService;
    if (this.userService.filmBookMarkListService.length) {
      this.count_marks = this.userService.totalResultMark;
      this.buildMarks();
    }
    this.filmFavoriteListService = this.userService.filmFavoriteListService;
    if (this.filmFavoriteListService.length) {
      this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.count_marks)
      this.pagingService.identLastPageService();
      this.buildFavorites();
      this.getNextPageFilms();
    }
  }

  isLastPage() {
    this.lastPage = this.pagingService.isLastPage();
  }

  getNextPageFilms(): void {
    this.pagingService.identStartEndPage();
    this.filmBookMarkList = this.filmBookMarkList.concat(this.filmBookMarkListService.slice(this.pagingService.startPage, this.pagingService.endPage));
    this.isLastPage();
  }

  buildMarks(): void {
    this.filmBookMarkListService.map(film => film.isMark = true);
  }

  buildFavorites() {
    this.filmBookMarkListService.map(film => {
      film.isFavorite = (this.userService.buildFavorites()).indexOf(film.id) > -1;
    })
  }

  makeStar(film: Film): void {
    let id = film.id;
    this.userService.makeFavoriteService(id, !film.isFavorite).pipe(
      switchMap(() => {
        return this.userService.getFavoriteFilmsService();
      })
    ).subscribe(res => {
      this.initParams();
      this.getBookMarkFilms();
    },
      err => {
        console.log(err)
      }
    )
  }

  makeMark(film: Film): void {
    let id = film.id;
    this.userService.makeBookMarkService(id, !film.isMark).pipe(
      switchMap(() => {
        return this.userService.getBookMarkFilmsService();
      })
    ).subscribe(() => {
      this.initParamsBookMark();
      this.initParams();
      this.getBookMarkFilms();
    },
      err => {
        console.log(err)
      })
  }

  initParams() {
    this.filmFavoriteListService = [];
    this.filmBookMarkListService = [];
    this.errorMessage = '';
  }

  initParamsBookMark() {
    this.filmBookMarkList = [];
    this.count_marks = 0;
  }

  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }

  trackByFn(item) {
    return item.id;
  }

}