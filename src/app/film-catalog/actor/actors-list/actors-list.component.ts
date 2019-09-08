import { Component, OnInit, Inject } from '@angular/core';
import { Config } from 'src/app/shared/models/config-model';
import { SearchApiService } from '../../search-api/search-api.service';
import { LOCAL_CONFIG } from '../../../shared/local-config';
import { FilmService } from '../../../shared/service/film.service';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/shared/models/actor.model';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { PagingService } from 'src/app/shared/service/paging.service';
import { Subscription } from 'rxjs';
import { ActorList } from 'src/app/shared/models/actorList.model';
import { Film } from 'src/app/shared/models/film.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'actors',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorListComponent implements OnInit {
  result: boolean = true;
  valueSearch: string = "";
  itemsOnPage = 8; 
  actorList: Actor[] = [];
  actorListService: Actor[] = [];
  imgUrl: string;
  imgUrlActor: string;
  totalResult: number;
  errorMessage = '';
  subscription$: Subscription;
  lastPage: boolean;

  constructor(
    public pagingService: PagingService,
    public searchApiService: SearchApiService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public filmsService: FilmService,
    public appSpinnerService: AppSpinnerService,
    public searchApi: SearchApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription$ = this.searchApiService.searchObserver$.subscribe(res => {
      this.valueSearch = res;
      this.pagingService.initPaging();
      this.initActors();
    })
  }

  initActors(): void {
    if (!this.valueSearch.length) {
      this.result = true;
      this.getActorService();
    }
    if (this.valueSearch.length) {
      this.result = false;
      this.renderResultSearch();
    }
  }

  getActors(): void {
    if (this.pagingService.checkNextFilmService()) {
      this.getActorService();
    } else {
      this.getNextPageActors();
    }
  }

  getActorService(): void {
    this.appSpinnerService.showOrHideSpinner(true);
    this.pagingService.changeCurrentPageService();
    this.filmsService.getPopularActors(this.pagingService.currentPageService).subscribe(
      (actors: ActorList) => {
        this.actorListService = this.actorListService.concat(actors.results);
        this.imgUrlActor = `${this.localConfig.smallBackPath}`;
        this.totalResult = actors.total_results;
        this.pagingService.setInitialParametersPaging(this.itemsOnPage, this.totalResult, actors.results.length)
        this.pagingService.identLastPageService();
        this.appSpinnerService.showOrHideSpinner(!true)
        this.getNextPageActors();
      },
      error => {
        this.router.navigate(['/main', { action: error }]);
      })
  }

  getNextPageActors(): void {
    this.pagingService.identStartEndPage();
    this.actorList = this.actorList.concat(this.actorListService.slice(this.pagingService.startPage, this.pagingService.endPage));
    this.isLastPage()
  }

  isLastPage() {
    this.lastPage = this.pagingService.isLastPage();
  }

  renderResultSearch(): void {
    this.actorList = []
    this.checkResultSearch();
  }

  checkResultSearch(): void {
    if (this.valueSearch.length) {
      this.chooseResultSearch();
    } else {
      this.actorListService = [];
      this.getActorService();
    }
  }

  chooseResultSearch(): void {
    this.result = false;
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

}
