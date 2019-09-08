import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { UserResolveService } from 'src/app/shared/service/user-resolve.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    RouterModule.forChild([
      { path: '', component: MainComponent, resolve: {resultResolve: UserResolveService}, },
    ])
  ],
  declarations: [
    MainComponent
  ],
  exports: [

  ],
  providers: []
})
export class MainModule { }
