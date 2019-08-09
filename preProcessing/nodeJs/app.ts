import { Keyword } from './models/keyword';
import startDB from "./db/db";
import uuid = require('uuid');

const googleTrends = require('google-trends-api');


async function start() {
  try {
    const db = await startDB();
    // companieNames.forEach(async (word) => {
    //   const keyword: Partial<Keyword> = { keyword: word };
    //   await db.create(keyword);
    // });
    const keywords = await db.findAll();
    console.log(keywords.length);
  } catch (error) {
    console.log("Could not connect to mongo database");
    console.log(error);
  }
}

start();

doGoogleTrendsApiCall();
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
doGoogleTrendsApiCallDaily();


async function doGoogleTrendsApiCall() {

  try {

    const results = await googleTrends.interestOverTime(
      {
        keyword: 'Trump',
        // startTime: new Date(2005, 0, 1),
        // endTime: new Date(),
        geo: ""
      });
    const jsonObject = JSON.parse(results);
    const example = jsonObject.default.timelineData[0];
    console.log(example);
    jsonObject.default.timelineData.forEach((e: any) => console.log(e["formattedTime"] + ': ' + e["value"]))


  } catch (error) {

    console.log(error);

  }
}

async function doGoogleTrendsApiCallDaily() {

  try {

    const results = await googleTrends.interestOverTime(
      {
        keyword: 'Trump',
        startTime: new Date(new Date().getFullYear(), new Date().getMonth()-6, new Date().getDate()),
        endTime: new Date(),
        geo: ""
      });
    const jsonObject = JSON.parse(results);
    const example = jsonObject.default.timelineData[0];
    console.log(example);
    jsonObject.default.timelineData.forEach((e: any) => console.log(e["formattedTime"] + ': ' + e["value"]))


  } catch (error) {

    console.log(error);

  }
}