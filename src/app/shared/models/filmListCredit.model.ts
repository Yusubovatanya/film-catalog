export class FilmListCredit {
  cast: FilmListCast[];
  crew: FilmListCrew[];
}

export class FilmListCast {
  character: string;
  release_date: string;
  vote_average: number;
  title: string;
  original_title: string;
  popularity: number;
  overview: string;
  poster_path: string | null;
  sort: string;
}

export class FilmListCrew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}