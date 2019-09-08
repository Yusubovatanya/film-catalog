import { Component, Inject } from '@angular/core';
import { FilmService } from './shared/service/film.service';
import { Router } from '@angular/router';
import { SearchApiService } from './film-catalog/search-api/search-api.service';
import { AuthService } from './shared/service/auth.service';
import { MessagesService } from './shared/service/messages.service';
import { UserService } from './shared/service/user.service';
import { LOCAL_CONFIG } from './shared/local-config';
import { Config } from 'protractor';
import { Film } from './shared/models/film.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  valueSearch: string;
  isLogin: boolean;
  username: string;
  isSearch: boolean;
  count_favorites: Observable<number>;
  count_marks: Observable<number>;

  constructor(
    public filmsService: FilmService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public router: Router,
    public searchApiService: SearchApiService,
    private authService: AuthService,
    private msgService: MessagesService,
    private userService: UserService) {
  }

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'active_link', icon: 'home' },
    { path: '/films', label: 'Фильмы', active: 'active_link', icon: 'list_alt' },
    { path: '/actors', label: 'Актеры', active: 'active_link', icon: 'list_alt' }
  ];

  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();
    this.authService.legLoginStatus().subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    })
    this.searchApiService.isSearchObserver$.subscribe((status) => {
      this.isSearch = status;
    })
    this.userService.initName$.subscribe((name) => {
      this.username = name;
    })
    this.count_favorites = this.userService.initFavorite$;
    this.count_marks = this.userService.initBookMark$;
  }

  changePage() {
    this.searchApiService.resetSearchField();
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

  exit() {
    this.userService.deleteSession().subscribe(() => {
      this.isSearch = false;
      this.router.navigate(['/login'])
        .then((isNavigate) => {
          if (isNavigate) {
            this.authService.exit();
          }
        })
        .catch((err) => {
          this.msgService.setMessage({
            type: 'danger',
            body: err
          });
        });
    })
  }
}
