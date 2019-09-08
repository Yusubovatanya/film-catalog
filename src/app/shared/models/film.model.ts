export class Film {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  id: number;
  isFavorite?: boolean;
  isMark?: boolean;
  vote_average: number;
  production_countries?: [string];
  genres?: [string];
  runtime?: string;
}

export class FilmList {
  page: number;
  results: Film[];
  total_results: number;
  total_pages: number;
}



