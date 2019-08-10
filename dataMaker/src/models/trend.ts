import { Entity } from './entity';
export interface Trend extends Entity {
  keywordId: string,
  keyword: string,
  time: string,
  date: Date,
  formattedTime: string,
  formattedAxisTime: string,
  value: number,
  type: 'daily' | 'hourly' | 'monthly'
}