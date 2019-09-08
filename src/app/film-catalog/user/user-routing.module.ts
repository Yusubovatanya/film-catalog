import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIdComponent } from './user-id/user-id.component';
import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { UserResolveService } from 'src/app/shared/service/user-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: UserComponent ,
    canActivateChild: [AuthGuard],
    resolve: {resultResolve: UserResolveService},
    children: [
      {
        path: '',
        component: UserComponent
      },
      {
        path: ':username',
        component: UserIdComponent,
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
export class UsersRoutingModule {
}





