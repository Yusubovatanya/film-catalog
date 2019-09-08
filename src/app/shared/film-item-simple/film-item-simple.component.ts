import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges, Inject } from '@angular/core';
import { Film } from 'src/app/shared/models/film.model';
import { LOCAL_CONFIG } from 'src/app/shared/local-config';
import { Config } from 'protractor';
import { ActorCast } from '../models/actorCast.model';


@Component({
  selector: 'app-film-item-simple',
  templateUrl: './film-item-simple.component.html',
  styleUrls: ['./film-item-simple.component.css']
})
export class FilmItemSimpleComponent implements OnInit {
  @Input() film: ActorCast | Film;
  @Input() counter: number;
  imgFull: string;
  imgUrl: string;
  constructor(private hostElement: ElementRef,
    @Inject(LOCAL_CONFIG) public localConfig: Config) {
    this.imgFull = localConfig.imgFull;
    this.imgUrl = this.localConfig.midImgPath;
  }

  ngOnInit() {
  }

}
