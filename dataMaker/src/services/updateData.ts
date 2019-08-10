import { Express } from 'express';
import { MongoGenericDAO } from './../models/mongo-generic.dao';
import { companieNames } from '../data/constants';
import { Keyword } from '../models/keyword';
import uuid = require('uuid');

export async function updateKeywords(app: Express) {
  const db: MongoGenericDAO<Keyword> = app.locals.keywordDAO;
  companieNames.forEach(async (word: any) => {
    console.log(word);
    const keyword: Keyword = {
      id: uuid(),
      createdAt: new Date().getMilliseconds(),
      keyword: word
    };
    await db.create(keyword);
  });
}
