import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LOCAL_CONFIG } from '../local-config';
import { Config } from 'protractor';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
  errMsg: string = "";
  typeMsg: string = "";

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error)
        this.handleAuthError(error);
        return of(error.error.status_message)
      }) as any);
  }

  private defineErrMsg(err) {
    if (err.error.status_message === "Session denied") {
      this.errMsg = "Сессия истекла. Вам необходимо авторизоваться";
    } else {
      this.errMsg = "Неверное имя пользователя и / или пароль"
    }
  }

  private showMsgError() {
    this.msgService.setMessage({
      type: this.typeMsg,
      body: this.errMsg
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    this.typeMsg = "danger";
    if (+err.status === 401 || +err.status === 403) {
      this.router.navigate([`/login`]);
      this.authService.exit();
      this.defineErrMsg(err);
      this.showMsgError()
      return of(err.message);
    } else {
      this.checkOtherErr(err)
    }
  }

  private checkOtherErr(err) {
    this.typeMsg = "danger";
    switch (+err.status) {
      case 404:
        this.typeMsg = "warning"
        this.errMsg = "Извините, по вашему запросу ничего не найдено!";
        break;
      case 500 || 503:
        this.errMsg = "Внутренняя ошибка сервера. Попробуйте еще раз."
        break;
      default:
        this.errMsg = `${err.statusText} ${err.status}`;
        break;
    }
    this.showMsgError()
    throw (err);
  }
}
