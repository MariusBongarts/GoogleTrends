import { Entity } from "./entity";

export interface SearchVolume extends Entity {
  keywordId: string
  keyword: string,
  searchVolume: number,
  cpc: string,
  competition: number
}