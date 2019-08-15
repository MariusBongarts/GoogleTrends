import { SeleniumSearchVolume } from './selenium/selenium.service';
import { Express } from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import { companieNames } from '../data/constants';
import { Keyword } from '../models/keyword';
import uuid = require('uuid');
import { saveMonthlyTrends, saveDailyTrends } from './google-trends.service';

export async function updateKeywords(app: Express) {
  const db: MongoGenericDAO<Keyword> = app.locals.keywordDAO;
  const words = await db.findAll();


  companieNames.forEach(async (word: any) => {

    // Add keyword if not already exists
    if (!words.find(e => e.keyword === word)) {
      const newKeyword: Partial<Keyword> = {
        keyword: word
      };
      await db.create(newKeyword);
    }

  });

  const keywords = await db.findAll();

  for (let i = 0; i<= keywords.length; i++) {
    try {
      await saveMonthlyTrends(app, keywords[i]);
    } catch (error) {
      console.log(error);
    }
  }


  const seleniumSearchVOlume = new SeleniumSearchVolume();
  await seleniumSearchVOlume.setup(app);
  // Add monthly trends
  await seleniumSearchVOlume.saveAbsoulteTrends(keywords.filter(e => !e.parentKeywordId));

}
