import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { LOCAL_CONFIG } from '../../shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { Router, NavigationEnd, ChildActivationStart, ActivationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  isSearch: boolean;
  valueSort: string = "";
  valueSearch: string = "";
  search = new ReplaySubject<string>(1);
  searchObserver$ = this.search.asObservable();

  resetSearch = new Subject<string>();
  resetSearchObserver$ = this.resetSearch.asObservable();
  isSearchStatus = new Subject<boolean>();
  isSearchObserver$ = this.isSearchStatus.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public router: Router
  ) {
    this.checkSearchStatus(router.url.slice(1));

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.valueSort = event.url.split('/')[1];
        this.search.next(this.valueSearch);
        this.checkSearchStatus(event.url.slice(1));
        this.resetSearchField()
      }
    });
  }

  checkSearchStatus(type) {
    let status;
    if (type === "actors" || type === "films") {
      status = true;
    } else {
      status = false;
    }
    this.isSearchStatus.next(status)
  }

  transferSearchValueService(valueSearch: string) {
    this.valueSearch = valueSearch;
    if ((this.valueSort === "main" || this.valueSort === "") && this.valueSearch.length) {
      this.router.navigateByUrl('/films');
    }
    this.search.next(this.valueSearch);
  }

  getSearch(valueSearch: string, page?: number) {
    if (this.valueSort === "actors") {
      return this.http.get(`${this.localConfig.searchUrl}/person?page=${page}${this.localConfig.params}&query=${encodeURIComponent(valueSearch)}&include_adult=false`);
    } else {
      return this.http.get(`${this.localConfig.searchUrl}/movie?page=${page}${this.localConfig.params}&query=${encodeURIComponent(valueSearch)}&include_adult=false`);
    }
  }

  resetSearchField() {
    this.valueSearch = "";
    this.resetSearch.next();
  }

}
