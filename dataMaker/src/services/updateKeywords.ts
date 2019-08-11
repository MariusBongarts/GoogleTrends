import { Express } from 'express';
import { MongoGenericDAO } from './../models/mongo-generic.dao';
import { companieNames } from '../data/constants';
import { Keyword } from '../models/keyword';
import uuid = require('uuid');
import { saveMonthlyTrends } from './google-trends.service';

export async function updateKeywords(app: Express) {
  const db: MongoGenericDAO<Keyword> = app.locals.keywordDAO;
  const words = await db.findAll();

  companieNames.forEach(async (word: any) => {

    // Add keyword if not already exists
    if (!words.find(e => e.keyword === word)) {
      const newKeyword: Keyword = {
        id: uuid(),
        createdAt: new Date().getMilliseconds(),
        keyword: word
      };
      await db.create(newKeyword);
    }
    const keyword = await db.findOne({keyword: word});

    // Add monthly trends
    //word === 'Apple' ? await saveMonthlyTrends(app, keyword) : '';
    await saveMonthlyTrends(app, keyword);


  });
}
