import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { FilmIdComponent } from './film-id/film-id.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmComponent } from './film.component';
import { UserResolveService } from 'src/app/shared/service/user-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: FilmComponent,
    /* Можно не указывать canActivateChild, т.к. стоит Guard canLoad в app-routing.module */
    /* и модуль UsersModule не будет загружен без авторизации */
    canActivateChild: [AuthGuard],
    resolve: {resultResolve: UserResolveService },
    children: [
      {
        path: "",
        component: FilmsListComponent
      },
      {
        path: ":id",
        component: FilmIdComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FilmRoutingModule { }
