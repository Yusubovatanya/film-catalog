import { Component, OnInit, Input, Inject } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { Film, FilmList } from 'src/app/shared/models/film.model';
import { Actor } from 'src/app/shared/models/actor.model';
import { LOCAL_CONFIG } from '../../shared/local-config';
import { Config } from 'protractor';
import { Router } from '@angular/router';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { PagingService } from 'src/app/shared/service/paging.service';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { UserService } from '../../shared/service/user.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActorList } from 'src/app/shared/models/actorList.model';

@Component({
  selector: 'app-search-api',
  templateUrl: './search-api.component.html',
  styleUrls: ['./search-api.component.css']
})
export class SearchApiComponent implements OnInit {
  isFilmSearch: boolean = true;
  filmListServiceSearch: Film[] = [];
  filmListSearch: Film[] = [];
  actorListSearch: Actor[] = [];
  actorListServiceSearch: Actor[] = [];
  filmFavoriteListService: Film[] = [];//all list
  filmBookMarkListService: Film[] = [];//all.list
  imgUrl: string;
  imgUrlActor: string;
  resultSearch: boolean = true;
  errorMessage = '';
  itemsOnPage = 8; //по сколько выводить элементов
  valueSort: string;
  valueSearch: string;
  totalResult: number;
  subscription$: Subscription;
  lastPage: boolean

  constructor(
    public pagingService: PagingService,
    public appSpinnerService: AppSpinnerService,
    public searchApiService: SearchApiService,
    private userService: UserService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public router: Router) {
  }

  ngOnInit() {
    this.filmFavoriteListService = this.userService.filmFavoriteListService;
    this.filmBookMarkListService = this.userService.filmBookMarkListService;
    this.subscription$ = this.searchApiService.searchObserver$.subscribe(res => {
      this.valueSearch = res;
      this.pagingService.initPaging();
      this.initSearch();
    });
  }

  initialAllParams() {
    this.filmListServiceSearch = [];
    this.actorListServiceSearch = [];
    this.initialParams();
  }

  initialParams(): void {
    this.filmListSearch = [];
    this.actorListSearch = [];
  }

  initSearch() {
    this.initialAllParams();
    this.valueSort = this.searchApiService.valueSort;
    if ((this.valueSort === "films" || this.valueSort === "actors") && this.valueSearch.length) {
      this.getResultSearch(this.valueSort, this.valueSearch)
    }
  }

  isLastPage() {
    this.lastPage = this.pagingService.isLastPage();
  }

  getNextPageFilms(): void {
    this.pagingService.identStartEndPage();
    if (this.isFilmSearch) {
      this.filmListSearch = this.filmListSearch.concat(this.filmListServiceSearch.slice(this.pagingService.startPage, this.pagingService.endPage));
    } else {
      this.actorListSearch = this.actorListSearch.concat(this.actorListServiceSearch.slice(this.pagingService.startPage, this.pagingService.endPage));
    }
    this.isLastPage()
  }

  getResultSearch(valueSort: string, valueSearch: string): void {
    this.valueSort = valueSort;
    this.valueSearch = valueSearch;
    if (valueSort === "films") {
      this.isFilmSearch = true;
      this.getResultSearchFilms();
    }
    if (valueSort === "actors") {
      this.isFilmSearch = false;
      this.getResultSearchActors();
    }
  }

  getResultSearchFilms(): void {
    this.appSpinnerService.showOrHideSpinner(true);
    this.pagingService.changeCurrentPageService();
    this.searchApiService.getSearch(this.valueSearch, this.pagingService.currentPageService).subscribe((searchList: FilmList) => {
      if (searchList.results.length) {
        this.resultSearch = true;
        this.imgUrl = `${this.localConfig.midImgPath}`;
        this.filmListServiceSearch = this.filmListServiceSearch.concat(searchList.results);
        this.totalResult = searchList.total_results;
        this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.totalResult, searchList.results.length)
        this.pagingService.identLastPageService();
        this.buildFavorites();
        this.buildMarks();
        this.getNextPageFilms();
      } else {
        this.resultSearch = false;
      }
      this.appSpinnerService.showOrHideSpinner(!true);
    },
      err => {
        console.log("error");
      })
  }

  getResultSearchActors(): void {
    this.appSpinnerService.showOrHideSpinner(true);
    this.pagingService.changeCurrentPageService();
    this.searchApiService.getSearch(this.valueSearch, this.pagingService.currentPageService)
    .subscribe((searchList: ActorList) => {
      if (searchList.total_results !== 0) {
        this.resultSearch = true;
        this.actorListServiceSearch = this.actorListServiceSearch.concat(searchList.results);
        this.imgUrlActor = `${this.localConfig.smallBackPath}`;
        this.totalResult = searchList.total_results;
        this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.totalResult, searchList.results.length)
        this.pagingService.identLastPageService();
        this.getNextPageFilms();
      } else {
        this.resultSearch = false;
      }
      this.appSpinnerService.showOrHideSpinner(!true);
    },
      err => {
        console.log("error");
      })

  }

  buildFavorites(): void {
    const favoriteList = this.userService.filmFavoriteListService.map(film => film.id);//static list
    this.filmListServiceSearch.map(film => {
      film.isFavorite = favoriteList.indexOf(film.id) > -1;
    })
  }

  buildMarks(): void {
    const markList = this.userService.filmBookMarkListService.map(film => film.id);//static list
    this.filmListServiceSearch.map(film => {
      film.isMark = markList.indexOf(film.id) > -1;
    })
  }

  makeStar(film: Film) {
    let id = film.id;
    this.userService.makeFavoriteService(id, !film.isFavorite).pipe(
      switchMap(() => {
        return this.userService.getFavoriteFilmsService()
      })
    ).subscribe(res => {
      this.initParamsFavoriteMark();
      this.buildFavorites();
    },
      err => {
        console.log(err)
      }
    )
  }

  makeMark(film: Film) {
    let id = film.id;
    this.userService.makeBookMarkService(id, !film.isMark).pipe(
      switchMap(() => {
        return this.userService.getBookMarkFilmsService()
      })
    ).subscribe(res => {
      this.initParamsFavoriteMark();
      this.buildMarks();
    },
      err => {
        console.log(err)
      }
    )
  }

  initParamsFavoriteMark() {
    this.filmFavoriteListService = [];
    this.filmBookMarkListService = [];
    this.errorMessage = '';
  }

  getSearchItems(): void {
    if (this.isFilmSearch === true) {
      if (this.pagingService.checkNextFilmService()) { //надо ли запрашивать с сервиса следущ.стр
        this.getResultSearchFilms();
      } else {
        this.getNextPageFilms();
      }
    } else {
      if (this.pagingService.checkNextFilmService()) {
        this.getResultSearchActors();
      } else {
        this.getNextPageFilms();
      }
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();  // отписка!
  }

  trackByFn(item) {
    return item.id;
  }

}
