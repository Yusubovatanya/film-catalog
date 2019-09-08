import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { LOCAL_CONFIG, localConfig } from './shared/local-config';
import { AuthService } from './shared/service/auth.service';
import { MessagesService } from './shared/service/messages.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { LoginComponent } from './film-catalog/login/login.component';
import { NotFoundComponent } from './film-catalog/not-found/not-found.component';
import { AlertsComponent } from './film-catalog/alerts/alerts.component';
import { RegistrationComponent } from './film-catalog/registration/registration.component';
import { SharedModule } from './shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/service/error-interceptors';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AlertsComponent,
    RegistrationComponent
  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [
    AuthService,
    MessagesService,
    AuthGuard,
    CanDeactivateGuard,
    { provide: LOCAL_CONFIG, useValue: localConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

