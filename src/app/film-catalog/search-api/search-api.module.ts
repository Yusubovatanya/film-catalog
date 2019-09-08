import { NgModule } from '@angular/core';

import { SearchApiComponent } from './search-api.component';
import { LOCAL_CONFIG, localConfig } from 'src/app/shared/local-config';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    AppMaterialModule,
    RouterModule
  ],
  declarations: [
    SearchApiComponent
  ],
  exports: [
    SearchApiComponent
  ],
  providers: [
    { provide: LOCAL_CONFIG, useValue: localConfig }
  ],
  bootstrap: []
})
export class SearchApiModule { }

