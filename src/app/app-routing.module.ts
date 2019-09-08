import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './film-catalog/registration/registration.component';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { NotFoundComponent } from './film-catalog/not-found/not-found.component';
import { LoginComponent } from './film-catalog/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "registration", component: RegistrationComponent, canDeactivate: [CanDeactivateGuard] },
  { path: "main", loadChildren: './film-catalog/main/main.module#MainModule', canLoad: [AuthGuard] },
  { path: "user", loadChildren: './film-catalog/user/user.module#UserModule', canLoad: [AuthGuard] },
  { path: "films", loadChildren: './film-catalog/film/film.module#FilmModule', canLoad: [AuthGuard] },
  { path: "actors", loadChildren: './film-catalog/actor/actor.module#ActorModule', canLoad: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// , {enableTracing: true}