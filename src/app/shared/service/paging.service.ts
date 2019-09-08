import { Injectable } from '@angular/core';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class PagingService {
  totalResults: number;
  partList: Film[] = [];
  listService: Film[] = [];
  currentPage: number = 0;   
  itemsOnPage: number; 
  endPage: number;
  startPage: number = 0;
  currentPageService: number = 0; 
  itemsOnPageService: number = 1;
  lastPage: number;
  result = true;

  constructor() { }

  initPaging() {
    this.currentPage = 0;
    this.currentPageService = 0;
    this.currentPage = 0;
    this.endPage = 0;
    this.startPage = 0;
    this.lastPage = 0;
    this.itemsOnPageService = 1;
  }

  setInitialParametersPaging(itemsOnPage: number, totalResults: number, itemsOnPageService: number = 1) {
    this.itemsOnPage = itemsOnPage; 
    this.totalResults = totalResults;
    this.itemsOnPageService = itemsOnPageService;
  }

  identLastPageService(): void {
    this.lastPage = Math.ceil(this.totalResults / this.itemsOnPage);

  }

  isLastPage() {
    if (this.lastPage === this.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  identStartEndPage(): void {
    this.startPage = this.itemsOnPage * this.currentPage;
    this.endPage = this.itemsOnPage + this.startPage;
    this.currentPage++;
  }

  changeCurrentPageService() {
    this.currentPageService++
  }

  checkNextFilmService() {
    return ((this.currentPage + 1) === Math.floor((this.itemsOnPageService * this.currentPageService) / this.itemsOnPage))
  }

}
