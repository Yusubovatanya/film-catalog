import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserBookMarkComponent } from './user-book-mark/user-book-mark.component';
import { UserIdComponent } from './user-id/user-id.component';
import { UsersRoutingModule } from './user-routing.module';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    UsersRoutingModule,
    RouterModule
  ],
  declarations: [
    UserComponent,
    UserFavoriteComponent,
    UserBookMarkComponent,
    UserIdComponent
  ],
  exports: [
  ],
  providers: [
    AuthGuard
  ]
})
export class UserModule { }

