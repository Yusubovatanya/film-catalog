import { Component, OnInit, Input, Inject, } from '@angular/core';
import { LOCAL_CONFIG } from 'src/app/shared/local-config';
import { Config } from 'protractor';
import { Actor } from '../models/actor.model';


@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {
  @Input() actor: Actor;
  
  imgFull: string
  imgUrl: string;

  constructor(@Inject(LOCAL_CONFIG) public localConfig: Config) {
    this.imgFull = localConfig.imgFull;
  }

  ngOnInit() {
    this.imgUrl = `${this.localConfig.smallBackPath}`;
  }
}
