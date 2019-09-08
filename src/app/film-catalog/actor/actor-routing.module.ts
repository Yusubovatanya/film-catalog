import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { ActorListComponent } from './actors-list/actors-list.component';
import { ActorIdComponent } from './actor-id/actor-id.component';
import { ActorComponent } from './actor.component';
import { UserResolveService } from 'src/app/shared/service/user-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ActorComponent,
    canActivateChild: [AuthGuard],
    resolve: {resultResolve: UserResolveService },
    children: [
      {
        path: '',
        component: ActorListComponent 
      },
      {
        path: ':id',
        component: ActorIdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule { }
