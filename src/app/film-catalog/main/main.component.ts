import { Component, OnInit, Inject } from "@angular/core";
import { AppSpinnerService } from "src/app/shared/service/app-spinner.service";
import { FilmService } from '../../shared/service/film.service';
import { Film, FilmList } from '../../shared/models/film.model';
import { SearchApiService } from '../search-api/search-api.service';
import { Router } from '@angular/router';
import { LOCAL_CONFIG } from '../../shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { Actor } from "src/app/shared/models/actor.model";
import { AuthService } from "src/app/shared/service/auth.service";
import { Subscription } from "rxjs";
import { ActorList } from "src/app/shared/models/actorList.model";

@Component({
  selector: "main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  result: boolean = true;

  currentPageService: number = 1; //paging service
  itemsOnPageService: number;
  itemsOnPage = 6;
  filmListService: Film[] = [];
  filmList: Film[] = [];
  actorList: Actor[] = [];
  actorListService: Actor[] = [];
  imgUrl: string;
  imgUrlActor: string;
  errorMessage = '';
  subscriptionActors$: Subscription;
  subscriptionFilms$: Subscription;
  isLogin: boolean;

  constructor(
    private authService: AuthService,
    public searchApiService: SearchApiService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public filmsService: FilmService,
    public appSpinnerService: AppSpinnerService,
    public searchApi: SearchApiService,
    public router: Router) {
  }

  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    if (this.isLogin) {
      this.init();
    }
  }

  init() {
    this.getFilmsService();
    this.getActorService();
  }

  getFilmsService() {
    this.appSpinnerService.showOrHideSpinner(true)
    this.subscriptionFilms$ = this.filmsService.getPopularFilms(this.currentPageService).subscribe(
      (filmItems: FilmList) => {
        console.log(filmItems)
        this.imgUrl = `${this.localConfig.midImgPath}`;
        this.filmListService = this.filmListService.concat(filmItems.results);
        this.appSpinnerService.showOrHideSpinner(!true);
        this.filmList = this.filmList.concat(this.filmListService.slice(0, this.itemsOnPage));
      },
      err => {
        console.log(err.messages);
      });
  }

  getActorService() {
    this.appSpinnerService.showOrHideSpinner(true)
    this.subscriptionActors$ = this.filmsService.getPopularActors(this.currentPageService).subscribe(
      (actors: ActorList) => {
        this.actorListService = this.actorListService.concat(actors.results);
        this.imgUrlActor = `${this.localConfig.smallBackPath}`;
        this.appSpinnerService.showOrHideSpinner(!true)
        this.actorList = this.actorList.concat(this.actorListService.slice(0, this.itemsOnPage));

      },
      err => {
        console.log("error");
      })
  }

  getIdActor(id) {
    this.router.navigate(['/actors', id]);
  }

  getIdFilm(id) {
    this.router.navigate(['/films', id]);
  }

  ngOnDestroy() {
    this.subscriptionActors$.unsubscribe();
  }

  trackByFn(item) {
    return item.id;
  }
}
