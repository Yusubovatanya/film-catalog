import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from './search/search.component';
import { ActorItemComponent } from './actors-items/actor-item.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { RouterModule } from '@angular/router';
import { FilmItemSimpleComponent } from './film-item-simple/film-item-simple.component';
import { ShortStatePipe } from './pipes/short-state.pipe';
import { VideoComponent } from './video/video.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { LoaderComponent } from './loader/loader.component';
import { TransformDatePipe } from './pipes/transform-date.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    SearchComponent,
    FilmItemComponent,
    ActorItemComponent,
    FilmItemSimpleComponent,
    ShortStatePipe,
    VideoComponent,
    VideoComponent,
    SanitizerPipe,
    LoaderComponent,
    TransformDatePipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    SearchComponent,
    FilmItemComponent,
    ActorItemComponent,
    FilmItemSimpleComponent,
    ShortStatePipe,
    VideoComponent,
    SanitizerPipe,
    TransformDatePipe,
    LoaderComponent
  ]
})
export class SharedModule { }
