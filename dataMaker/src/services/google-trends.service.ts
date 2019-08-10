import { Express } from 'express';
import { MongoGenericDAO } from './../models/mongo-generic.dao';
import { Trend } from './../models/trend';
import { Keyword } from './../models/keyword';
const googleTrends = require('google-trends-api');

const HttpsProxyAgent = require('https-proxy-agent');

let proxyAgent =  new HttpsProxyAgent('http://8.8.8.8:8080');


export async function saveMonthlyTrends(app: Express, keyword: Keyword, startDate?: Date, endDate?: Date, geo?: string) {
  const db: MongoGenericDAO<Trend> = app.locals.trendDAO;
  try {
    const trends = await db.findAll({ keywordId: keyword.id, type: 'monthly' });
    const latestTrend = trends.find(e => (e.date.getMonth() === new Date().getMonth()+1 && e.date.getFullYear() === new Date().getFullYear()));

    // Update only new month
    if (!latestTrend && trends.length > 0) {
      console.log("Update new month");
    }

    // Update all
    else if(!trends.length && !latestTrend) {
      console.log("Update all monhtly of " + keyword.keyword);

      const results = await googleTrends.interestOverTime(
        {
          // agent: proxyAgent,
          keyword: keyword.keyword,
          startTime: startDate ? startDate : '',
          endTime: endDate ? endDate : '',
          geo: geo ? geo : ''
        });

    const result: any[] = JSON.parse(results).default.timelineData;

    result.forEach(async (jsonObject) => {

      const date = new Date(jsonObject["formattedAxisTime"]);
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);

      const monthTrend: Partial<Trend> = {
        keywordId: keyword.id,
        keyword: keyword.keyword,
        type: 'monthly',
        formattedTime: jsonObject["formattedTime"],
        value: jsonObject["value"][0],
        time: jsonObject["time"],
        date: date
      }

      // console.log(monthTrend);
      await db.create(monthTrend);

    });

    console.log(`Finished monthly ${keyword.keyword}!`);
  }
  else {
    console.log("No update needed of " + keyword.keyword);
  }


  } catch (error) {

  console.log(error);

}
}

async function doGoogleTrendsApiCallDaily() {

  try {

    const results = await googleTrends.interestOverTime(
      {
        keyword: 'Trump',
        startTime: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()),
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