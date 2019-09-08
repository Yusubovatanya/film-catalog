import { Injectable, Inject } from '@angular/core';
import { Observable, observable, Subject, ReplaySubject, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, tap, mergeMap, map, switchMap } from 'rxjs/operators';
import { nextContext } from '@angular/core/src/render3';
import { LOCAL_CONFIG } from '../local-config';
import { Config } from '../models/config-model';
import { QueryParams } from '../models/auth.model';
import { RequestToken } from '../models/RequestToken.model';
import { RequestSessionId } from '../models/requestSessionId.model';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  observer = new ReplaySubject(1);
  authorization$: Observable<{}>;
  params: HttpParams;
  session_id: string;
  expiresDate: any;
  request_token: any

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: Config
  ) {
    moment.locale('ru-RU');
    if (+localStorage.getItem('expiresDate') >= +moment()) {
      this.loggedIn = !!localStorage.getItem('auth_token');
    } else {
      this.loggedIn = false;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  exit() {
    this.loggedIn = false;
    this.observer.next(this.loggedIn)
    localStorage.clear();
  }

  legLoginStatus() {
    return this.observer.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.localConfig.authUrl}${this.localConfig.apiKey}`).pipe(
      tap((res: RequestToken) => {
        this.expiresDate = moment(res.expires_at).format('x');
        localStorage.setItem('expiresDate', this.expiresDate);
      }),
      map((res: RequestToken) => {
        return [
          { 'password': password, 'request_token': res.request_token, 'api_key': `${this.localConfig.apiKey}` },
          { 'request_token': res.request_token }
        ]
      }),
      mergeMap((params: QueryParams[]) => {
        return this.http.get(`${this.localConfig.authUrlUser}${username}`, { params: params[0] }).pipe(
          switchMap((res) => {
            return this.http.get(`${this.localConfig.authId}${this.localConfig.apiKey}`, { params: params[1] }).pipe(
              tap((res: RequestSessionId) => {
                if (res.success) {
                  this.setAuthToLocalStorage(res.session_id);
                }
              })
            )
          })
        )
      }
      )
    )
  }


  setAuthToLocalStorage(id): void {
    localStorage.setItem('auth_token', id);
    this.loggedIn = true;
    this.observer.next(this.loggedIn)
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }
}
