import { Component, OnInit, Input, Inject } from '@angular/core';
import { Video } from '../models/video.model';
import { LOCAL_CONFIG } from '../local-config';
import { Config } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  videoPath: string;
  videoPathVimeo: string;

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  videoPathResult(video) {  
    if (video.site === 'YouTube' || video.site === 'Vimeo') {
      if (video.site === 'YouTube') {
        this.videoPath = `${this.localConfig.videoPath}`;
      } else {
        this.videoPath = `${this.localConfig.videoPathVimeo}`;
      }
      return true
    } else {
      return false
    }
  }

}
