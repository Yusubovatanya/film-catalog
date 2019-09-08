import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmIdComponent } from './film-id/film-id.component';
import { FilmRoutingModule } from './film-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SearchApiModule } from '../search-api/search-api.module';
import { FilmComponent } from './film.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FilmRoutingModule,
    SharedModule,
    AppMaterialModule,
    SearchApiModule,
    RouterModule
  ],
  declarations: [
    FilmsListComponent,
    FilmIdComponent,
    FilmComponent
  ],
  exports: [

  ]
  
})
export class FilmModule { }



