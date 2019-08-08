import { Keyword } from './models/keyword';
import { companieNames } from "./constants";
import startDB from "./db/db";
import uuid = require('uuid');

const googleTrends = require('google-trends-api');


async function updateKeywords() {
  try {
    const db = await startDB();
    companieNames.forEach(async (word) => {
      const keyword: Partial<Keyword> = { keyword: word };
      await db.create(keyword);
    });
  } catch (error) {
    console.log("Could not connect to mongo database");
    console.log(error);
  }
}

updateKeywords();



async function doGoogleTrendsApiCall() {

  try {

    const results = await googleTrends.interestOverTime(
      {
        keyword: 'Tesla',
        // startTime: new Date(2019, 7, 1),
        // endTime: new Date(),
        geo: "DE"
      });

    console.log(results);

  } catch (error) {

    console.log(error);

  }
}
