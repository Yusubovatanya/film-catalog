import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientXsrfModule } from '@angular/common/http';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    HttpClientXsrfModule,
    ScrollDispatchModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatMenuModule,
    ScrollingModule
  ]
})
export class AppMaterialModule { }
