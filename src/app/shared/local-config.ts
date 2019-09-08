import { InjectionToken } from '@angular/core';
import { Config } from './models/config-model';

export const localConfigStatic = {
  apiUrl: 'https://api.themoviedb.org/3',
  movieUrl: 'https://api.themoviedb.org/3/movie',
  imgPath: 'https://image.tmdb.org/t/p',
  authUrl: 'https://api.themoviedb.org/3/authentication/token/new?api_key=',
  apiKey: '0f6935ef46f5b5799884189f051f140c',
  authUrlUser: 'https://api.themoviedb.org/3/authentication/token/validate_with_login?username=',
  autId: 'https://api.themoviedb.org/3/authentication/session/new?api_key=',
  userUrl: 'https://api.themoviedb.org/3/account?api_key=',
  userAccId: 'https://api.themoviedb.org/3/account/',
  videoPath: "https://www.youtube.com/embed/",
  videoPathVimeo: "https://player.vimeo.com/video/"
}

export const localConfig: Config = {
  apiUrl: localConfigStatic.apiUrl,
  apiKey: localConfigStatic.apiKey,
  movieUrl: localConfigStatic.movieUrl,
  imgPath: localConfigStatic.imgPath,
  authUrl: localConfigStatic.authUrl,
  userUrl: localConfigStatic.userUrl,
  authUrlUser: localConfigStatic.authUrlUser,
  authId: localConfigStatic.autId,
  videoPath: localConfigStatic.videoPath,
  videoPathVimeo: localConfigStatic.videoPathVimeo,
  searchUrl: `${localConfigStatic.apiUrl}/search`,
  personUrl: `${localConfigStatic.apiUrl}/person`,
  params: `&api_key=${localConfigStatic.apiKey}&language=ru-RU`,
  paramsUser: `api_key=${localConfigStatic.apiKey}&language=ru-RU`,
  paramsEn: `&api_key=${localConfigStatic.apiKey}&language=en-EN`,
  midImgPath: `${localConfigStatic.imgPath}/w500`,
  smallImgPath: `${localConfigStatic.imgPath}/w185`,
  bigBackPath: `${localConfigStatic.imgPath}/w1280`,
  midBackPath: `${localConfigStatic.imgPath}/w780`,
  smallBackPath: `${localConfigStatic.imgPath}/w300`,
  userPath: `${localConfigStatic.imgPath}/w150_and_h150_face/`,
  userAccId: localConfigStatic.userAccId,
  userAccIdList: `/lists?`,
  paramsApi: `&api_key=${localConfigStatic.apiKey}`,
  imgFull: `../../../assets/actors.jpg`,
};


export const LOCAL_CONFIG = new InjectionToken<Config>('qwerty');


