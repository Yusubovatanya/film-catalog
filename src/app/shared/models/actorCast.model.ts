export class ActorCastCrew {
  cast: ActorCast[];
  crew: ActorCrew[];
}

export class ActorCast {
  backdrop_path: null | string;
  character: string;
  credit_id: string;
  genre_ids: { id: number, name: string }
  id: number;
  original_title: string;
  overview: string;
  popularity: number
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
}

export class ActorCrew {
  credit_id: string;
  backdrop_path: string;
  department: string;
  job: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean
  vote_average: number;
  vote_count: number;
  id: number;
  name: string;
  profile_path: string | null;
}
