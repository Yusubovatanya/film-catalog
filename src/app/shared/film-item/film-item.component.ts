import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges, Inject } from '@angular/core';
import { Film } from 'src/app/shared/models/film.model';
import { LOCAL_CONFIG } from 'src/app/shared/local-config';
import { Config } from 'protractor';


@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input() counter: number;
  @Output('star') starEmitter = new EventEmitter<Film>();
  @Output('mark') markEmitter = new EventEmitter<Film>();

  imgFull: string;
  imgUrl: string;
  poster: string;
  constructor(private hostElement: ElementRef,
    @Inject(LOCAL_CONFIG) public localConfig: Config) {
    this.imgFull = localConfig.imgFull;
    this.imgUrl = this.localConfig.midImgPath;
  }

  ngOnInit() {
    this.poster = this.film.poster_path ? this.imgUrl + this.film.poster_path : this.imgFull
  }

  starFilm() {
    this.starEmitter.emit(this.film);
  }

  markFilm() {
    this.markEmitter.emit(this.film);
  }

  showFilmInfo() {
    return true;
  }

}
