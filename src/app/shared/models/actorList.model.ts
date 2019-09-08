import { Actor } from "./actor.model";

export class ActorList {
  page: number;
  results: Actor[];
  total_pages: number;
  total_results: number;
}