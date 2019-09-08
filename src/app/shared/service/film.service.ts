import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../local-config';
import { Config } from 'protractor';
import { AuthService } from './auth.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor(@Inject(LOCAL_CONFIG) public localConfig: Config, private http: HttpClient, private authService: AuthService) { }

  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular?page=${page}${this.localConfig.params}`);

  }
  getPopularActors(page?: number) {
    return this.http.get(`${this.localConfig.personUrl}/popular?page=${page}${this.localConfig.params}`);
  }

  getFilmId(id: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}?${this.localConfig.params}`);
  }

  getActorId(id: number) {
    return this.http.get(`${this.localConfig.personUrl}/${id}?${this.localConfig.params}`);
  }

  getFilmCredit(id: number) {
    return this.http.get(`${this.localConfig.personUrl}/${id}/movie_credits?${this.localConfig.params}`);
  }

  getActorCast(id: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}/credits?${this.localConfig.params}`);
  }

  getVideos(id: number) {
    return this.http.get(`${this.localConfig.movieUrl}/${id}/videos?${this.localConfig.params}`);
  }

  getDate(dateList) {
    dateList.forEach(film => {
      film.release_date = +moment(film.release_date, "YYYY-MM-DD").format('x');
    });
    return dateList;
  }

}

