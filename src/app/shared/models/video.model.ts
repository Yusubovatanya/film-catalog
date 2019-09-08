export class Video {
  name: string;
  key: string;
  site: string;
  type: string
}

export class VideoList {
  id: number;
  results: Video[]
}