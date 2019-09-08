import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { Film } from 'src/app/shared/models/film.model';
import { PagingService } from 'src/app/shared/service/paging.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.css']
})
export class UserFavoriteComponent implements OnInit {
  filmFavoriteListService: Film[] = [];
  filmBookMarkListService: Film[] = [];
  filmFavoriteList: Film[] = [];
  count_favorites: number;
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
    this.getFavoriteFilms();
  }

  getFavoriteFilms(): void {
    this.pagingService.initPaging();
    this.filmFavoriteListService = this.userService.filmFavoriteListService;
    if (this.filmFavoriteListService.length) {
      this.count_favorites = this.userService.totalResultFavorite;
      this.buildFavorites();
    }
    this.filmBookMarkListService = this.userService.filmBookMarkListService;
    if (this.userService.filmBookMarkListService) {
      this.buildMarks();
    }
    this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.count_favorites)
    this.pagingService.identLastPageService();
    this.getNextPageFilms();
  }

  isLastPage() {
    this.lastPage = this.pagingService.isLastPage();
  }

  getNextPageFilms(): void {
    this.pagingService.identStartEndPage();
    this.filmFavoriteList = this.filmFavoriteList.concat(this.filmFavoriteListService.slice(this.pagingService.startPage, this.pagingService.endPage));
    this.isLastPage();
  }

  buildFavorites(): void {
    this.filmFavoriteListService.map(film => {
      film.isFavorite = true;
    })
  }

  buildMarks(): void {
    this.filmFavoriteListService.map(film => {
      film.isMark = (this.userService.buildMarks()).indexOf(film.id) > -1;
    })
  }

  makeStar(film: Film): void {
    let id = film.id;
    this.userService.makeFavoriteService(id, !film.isFavorite).pipe(
      switchMap(() => {
        return this.userService.getFavoriteFilmsService()
      })
    ).subscribe(() => {
      this.initParamsFavorite()
      this.initParams();
      this.getFavoriteFilms();
    },
      err => {
        console.log(err)
      })
  }

  makeMark(film: Film): void {
    let id = film.id;
    this.userService.makeBookMarkService(id, !film.isMark).pipe(
      switchMap(() => {
        return this.userService.getBookMarkFilmsService()
      })
    ).subscribe(() => {
      this.initParams();
      this.getFavoriteFilms();
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

  initParamsFavorite() {
    this.count_favorites = 0;
    this.filmFavoriteList = [];
  }


  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }

  trackByFn(item) {
    return item.id;
  }


}
