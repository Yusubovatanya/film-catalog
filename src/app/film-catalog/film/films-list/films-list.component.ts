import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList, SimpleChanges, Inject } from '@angular/core';
import { FilmService } from '../../../shared/service/film.service';
import { Film, FilmList } from '../../../shared/models/film.model';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { SearchApiService } from '../../search-api/search-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_CONFIG } from '../../../shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { UserService } from '../../../shared/service/user.service';
import { PagingService } from 'src/app/shared/service/paging.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  result: boolean;
  valueSearch: string = "";
  itemsOnPage = 8;
  filmListService: Film[] = [];
  filmList: Film[] = [];
  imgUrl: string;
  imgUrlActor: string;
  isSpinnerValue: boolean = true;
  totalResult: number;
  errorMessage = '';
  filmFavoriteListService: Film[] = [];
  filmBookMarkListService: Film[] = [];
  count_favorites: number;
  count_marks: number;
  subscription$: Subscription;
  subscriptionActivate: Subscription;
  lasPage: boolean;

  constructor(
    public searchApiService: SearchApiService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public filmsService: FilmService,
    public appSpinnerService: AppSpinnerService,
    public searchApi: SearchApiService,
    public router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public pagingService: PagingService,
  ) { }

  ngOnInit() {
    this.filmFavoriteListService = this.userService.filmFavoriteListService;
    this.filmBookMarkListService = this.userService.filmBookMarkListService;
    this.subscription$ = this.searchApiService.searchObserver$.subscribe(res => {
      this.valueSearch = res;
      this.pagingService.initPaging();
      this.initFilms();
    })
  }

  initFilms(): void {
    if (!this.valueSearch.length) {
      this.result = true;
      this.getFilmsService();
    }
    if (this.valueSearch.length) {
      this.result = false;
      this.renderResultSearch();
    }
  }

  getFilms(): void {
    if (this.pagingService.checkNextFilmService()) {
      this.getFilmsService();
    } else {
      this.getNextPageFilms();
    }
  }

  buildFavorites(): void {
    this.filmListService.map(film => {
      film.isFavorite = (this.userService.buildFavorites()).indexOf(film.id) > -1;
    })
  }

  buildMarks(): void {
    this.filmListService.map(film => {
      film.isMark = (this.userService.buildMarks()).indexOf(film.id) > -1;
    })
  }

  makeStar(film: Film): void {
    let id = film.id;
    this.userService.makeFavoriteService(id, !film.isFavorite).pipe(
      switchMap(() => {
        return this.userService.getFavoriteFilmsService();
      })
    ).subscribe(() => {
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
    ).subscribe(() => {
      this.initParamsFavoriteMark();
      this.buildMarks();
    },
      error => {
        this.router.navigate(['/main', { action: error }]);
      })
  }

  initParamsFavoriteMark(): void {
    this.filmFavoriteListService = [];
    this.filmBookMarkListService = [];
    this.count_favorites = 0;
    this.count_marks = 0;
    this.errorMessage = '';
  }

  getFilmsService(): void {
    this.appSpinnerService.showOrHideSpinner(true);
    this.pagingService.changeCurrentPageService();
    this.filmsService.getPopularFilms(this.pagingService.currentPageService).subscribe(
      (filmItems: FilmList) => {
        this.filmListService = this.filmListService.concat(filmItems.results);
        this.imgUrl = `${this.localConfig.midImgPath}`;
        this.totalResult = filmItems.total_results;
        this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.totalResult, filmItems.results.length)
        this.pagingService.identLastPageService();
        this.buildFavorites();
        this.buildMarks();
        this.getNextPageFilms();
        this.appSpinnerService.showOrHideSpinner(!true)
      },
      err => {
        console.log(err);
      });
  }

  isLastPage() {
    this.lasPage = this.pagingService.isLastPage();
  }

  getNextPageFilms(): void {
    this.pagingService.identStartEndPage();
    this.filmList = this.filmList.concat(this.filmListService.slice(this.pagingService.startPage, this.pagingService.endPage));
    this.isLastPage();
  }

  renderResultSearch(): void {
    this.filmList = [];
    this.checkResultSearch();
  }

  checkResultSearch(): void {
    if (this.valueSearch.length) {
      this.result = false;
    } else {
      this.filmListService = [];
      this.getFilmsService();
    }
  }

  filterItems(list, value, key) {
    let exp = new RegExp(value, "i");
    return list.filter(item => {
      return exp.test(item[key]);
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();  
  }

  trackByFn(item) {
    return item.id;
  }
}

