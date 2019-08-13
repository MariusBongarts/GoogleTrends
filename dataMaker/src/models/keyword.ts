import { Entity } from './entity';


export interface Keyword extends Entity{
  keyword: string;
  parentKeywordId?: string;
}