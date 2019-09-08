import { Component, OnInit } from '@angular/core';
import { SearchApiService } from 'src/app/film-catalog/search-api/search-api.service';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  valueSearch: string;
  subscription$: Subscription;

  subscription: Subscription;
  keydown: Observable<Event>;

  constructor(
    public searchApiService: SearchApiService
  ) {

  }

  ngOnInit() {
    this.subscription$ = this.searchApiService.resetSearchObserver$.subscribe(() => this.valueSearch = "")

    this.keydown = fromEvent(document, 'keydown').pipe(
    )
    
    this.subscription = this.keydown.subscribe((event: KeyboardEvent) => {
      if ((event.code === 'KeyX' && event.ctrlKey == true) || event.key === "Backspace" || event.key === "Delete") {
        if (this.valueSearch.length) {
          this.searchApiService.transferSearchValueService("");
        }
      }
    })
  }

  clearField() {
    this.valueSearch = "";
    this.searchApiService.transferSearchValueService("");
  }

  search() {
    if (this.valueSearch.length > 2) {
      this.searchApiService.transferSearchValueService(this.valueSearch);
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();  
  }
}

