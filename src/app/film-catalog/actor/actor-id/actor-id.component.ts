import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Config } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_CONFIG } from '../../../shared/local-config';
import { FilmService } from '../../../shared/service/film.service';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { forkJoin, merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActorCastCrew, ActorCast } from 'src/app/shared/models/actorCast.model';
import { Actor } from 'src/app/shared/models/actor.model';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css'],
})
export class ActorIdComponent implements OnInit {
  actorId: Actor;
  filmListCredit: ActorCast[] = [];
  imgUrlActor: string;
  imgUrlFilmCredit: string;
  displayedColumns: string[] = ['title', 'vote_average', 'release_date', 'character', 'poster_path'];
  imgFull: string;
  id: number;
  dataSource: MatTableDataSource<ActorCast>;
  dataSourceService: ActorCast[];
  isLoadingResults = true;

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public appSpinnerService: AppSpinnerService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public filmService: FilmService,
    public messagesService: MessagesService) {
    this.imgFull = localConfig.imgFull;
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.appSpinnerService.showOrHideSpinner(true)
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          return forkJoin(
            this.filmService.getActorId(this.id),
            this.filmService.getFilmCredit(this.id)
          )
        })
      ).subscribe((data: [Actor, ActorCastCrew]) => {
        if (data[0]) {
          this.actorId = data[0];
          this.imgUrlActor = `${this.localConfig.smallBackPath}`;
        }
        if (data[1]) {
          this.dataSourceService = data[1].cast;
          this.dataSourceService = this.filmService.getDate(this.dataSourceService);
          this.filmListCredit = this.dataSourceService.slice(0, 6);
          if (!this.filmListCredit.length) {
            this.isLoadingResults = false;
          }
          this.imgUrlFilmCredit = `${this.localConfig.smallBackPath}`;
          this.dataSource = new MatTableDataSource(this.dataSourceService);
          this.dataSource.sort = this.sort;
          this.appSpinnerService.showOrHideSpinner(false)
        }

      },
        error => this.router.navigate(['/actors', { action: error }])
      );
  }

  selectRow(row) {
    this.router.navigate(['/films', row.id]);
  }

  getUrl(el) {
    return `url(${el.poster_path ? this.imgUrlFilmCredit + el.poster_path : this.imgFull})`
  }

  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }

}
