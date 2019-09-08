import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { LOCAL_CONFIG } from '../../../shared/local-config';
import { Config } from 'protractor';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FilmService } from '../../../shared/service/film.service';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { Film } from 'src/app/shared/models/film.model';
import { forkJoin, Subscription } from 'rxjs';
import { UserService } from '../../../shared/service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Video, VideoList } from 'src/app/shared/models/video.model';
import { switchMap } from 'rxjs/operators';
import { FilmListCredit, FilmListCast, FilmListCrew } from 'src/app/shared/models/filmListCredit.model';

@Component({
  selector: 'app-film-id',
  templateUrl: './film-id.component.html',
  styleUrls: ['./film-id.component.css']
})
export class FilmIdComponent implements OnInit {
  @Output('star') starEmitter = new EventEmitter<Film>();
  @Output('mark') markEmitter = new EventEmitter<Film>();
  percentage: number = 60;
  filmId: Film;
  actorListCast: FilmListCast[];
  imgUrlActorCast: string;
  imgUrlFilm: string;
  columnsToDisplay = ['год', 'фильм', 'роль'];
  id: number;
  production_countries: string[] = [];
  actorCrewDirector: FilmListCrew[];
  imgFull: string;
  videos: Video[] = [];
  videoPath: string;
  videoPathVimeo: string;
  subscription$: Subscription;
  trailer: Video;
  isPlay: boolean = false;
  selectedIndex: number;
  poster: any;

  constructor(
    public sanitizer: DomSanitizer,
    private userService: UserService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public appSpinnerService: AppSpinnerService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public filmService: FilmService,
    public messagesService: MessagesService,
  ) {
    this.imgFull = localConfig.imgFull;
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');////????
  }

  ngOnInit() {
    this.setInitialTab();
    this.appSpinnerService.showOrHideSpinner(true)
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    const dataStream = forkJoin(
      this.filmService.getFilmId(this.id),
      this.filmService.getActorCast(this.id),
      this.filmService.getVideos(this.id)
    );
    this.subscription$ = dataStream.subscribe((data: [Film, FilmListCredit, VideoList]) => {
      if (data) {
        if (data[0]) {
          this.filmId = data[0];
          this.imgUrlFilm = `${this.localConfig.smallBackPath}`;
          this.poster = this.filmId.poster_path ? this.imgUrlFilm + this.filmId.poster_path : this.imgFull
          this.buildFavorites();
          this.buildMarks()
        }
        if (data[1].cast) { 
          this.actorListCast = data[1].cast.slice(0, 6);
          this.imgUrlActorCast = `${this.localConfig.smallBackPath}`;
        }
        if (data[1].crew) {
          this.actorCrewDirector = data[1].crew.filter(item => {
            return item.job.toLocaleLowerCase() === "director";
          });
        }
        if (data[2].results.length) {
          this.videos = data[2].results;
          let trailerElement = this.videos.filter(element => {
            return element.type = "Trailer"
          });
          this.trailer = trailerElement[0];
        }
      }
      this.appSpinnerService.showOrHideSpinner(false)
    },
      error => {
        this.router.navigate(['/films', { action: error }]);
      }
    )
  }

  setInitialTab() {
    if (localStorage.getItem('selectedIndex')) {
      this.selectedIndex = +localStorage.getItem('selectedIndex');
    } else {
      this.selectedIndex = 0;
    }
  }

  tabChanged(): void {
    if (localStorage.getItem('selectedIndex')) {
      localStorage.removeItem('selectedIndex')
    }
    localStorage.setItem('selectedIndex', this.selectedIndex.toString());
  }

  closePlay() {
    this.isPlay = !this.isPlay
  }

  buildFavorites(): void {
    this.filmId.isFavorite = (this.userService.buildFavorites()).indexOf(this.filmId.id) > -1;
  }

  buildMarks(): void {
    this.filmId.isMark = (this.userService.buildMarks()).indexOf(this.filmId.id) > -1;
  }

  starFilm() {
    this.userService.makeFavoriteService(this.filmId.id, !this.filmId.isFavorite).pipe(
      switchMap(() => {
        return this.userService.getFavoriteFilmsService()
      })
    ).subscribe(() => {
      this.buildFavorites();
    },
      err => console.log(err)
    )
  }

  makeMark() {
    this.userService.makeBookMarkService(this.filmId.id, !this.filmId.isMark).pipe(
      switchMap(() => {
        return this.userService.getBookMarkFilmsService()
      })
    ).subscribe(res => {
      this.buildMarks();
    },
      err => console.log(err)
    )
  }

  showFilmInfo() {
    return true;
  }

  playFilm() {
    this.isPlay = true;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
