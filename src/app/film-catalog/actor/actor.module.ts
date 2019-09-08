import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorIdComponent } from './actor-id/actor-id.component';
import { ActorListComponent } from './actors-list/actors-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SearchApiModule } from '../search-api/search-api.module';
import { ActorRoutingModule } from './actor-routing.module';
import { ActorComponent } from './actor.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    SearchApiModule,
    ActorRoutingModule,
    MatTableModule,
    RouterModule   
  ],
  declarations: [
    ActorListComponent,
    ActorIdComponent,
    ActorComponent
  ],
  exports: [
  ],
  providers: []
})
export class ActorModule { }
