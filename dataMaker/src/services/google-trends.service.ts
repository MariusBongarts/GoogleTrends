import { Express } from 'express';
import { MongoGenericDAO } from './../models/mongo-generic.dao';
import { Trend } from './../models/trend';
import { Keyword } from './../models/keyword';
const googleTrends = require('google-trends-api');

const HttpsProxyAgent = require('https-proxy-agent');

// Try one retry in case of proxy errors
let retried = false;


export async function saveMonthlyTrends(app: Express, keyword: Keyword, startDate?: Date, endDate?: Date, geo?: string) {
  // Uses proxy of https://proxymesh.com/account/dashboard/ => ip4 has to be inserted on site
  let proxyAgent = new HttpsProxyAgent('http://us-wa.proxymesh.com:31280');

  const db: MongoGenericDAO<Trend> = app.locals.trendDAO;
  try {
    const trends = await db.findAll({ keywordId: keyword.id, type: 'monthly' });
    const latestTrend = trends.find(e => (e.date.getMonth() === new Date().getMonth() + 1 && e.date.getFullYear() === new Date().getFullYear()));

    // Update only new month
    if (!latestTrend && trends.length > 0) {
      console.log("Update new month");
    }

    // Update all
    else if (!trends.length && !latestTrend && !retried) {
      console.log("Update all monhtly of " + keyword.keyword);

      const results = await googleTrends.interestOverTime(
        {
          agent: proxyAgent,
          keyword: keyword.keyword,
          startTime: startDate ? startDate : '',
          endTime: endDate ? endDate : '',
          geo: geo ? geo : ''
        });

      const result: any[] = JSON.parse(results).default.timelineData;

      let lastValue = 0;
      let lastDiffAgg = 0;

      result.forEach(async (jsonObject, index) => {

        const date = new Date(jsonObject["formattedAxisTime"]);
        date.setMonth(date.getMonth() + 1);
        date.setDate(1);

        let diffValue = jsonObject["value"][0] - lastValue;

        // Increases aggregated diff if last one was positive and diff Value is positie too, else sets to 0
        lastDiffAgg >= 0 && diffValue >= 0 ? lastDiffAgg += diffValue : lastDiffAgg = 0;

        // Because otherwise it´s often directly 100
        index === 0 ? lastDiffAgg = lastDiffAgg / 2 : '';

        const monthTrend: Partial<Trend> = {
          keywordId: keyword.id,
          keyword: keyword.keyword,
          type: 'monthly',
          formattedTime: jsonObject["formattedTime"],
          value: jsonObject["value"][0],
          diffValue: diffValue,
          diffValueAgg: lastDiffAgg,
          time: jsonObject["time"],
          date: date
        }

        lastValue = jsonObject["value"][0];


        // console.log(monthTrend);
        await db.create(monthTrend);

      });

      console.log(`Finished monthly ${keyword.keyword}!`);
    }
    else {
      console.log("No update needed of " + keyword.keyword);
    }


  } catch (error) {
    // Retry once
    console.log(retried);
    console.log("Do retry for " + keyword.keyword);
    await saveMonthlyTrends(app, keyword, startDate, endDate, geo);
    retried = true;
    console.log(error);

  }
}

export async function saveDailyTrends(app: Express, keyword: Keyword, startDate?: Date, endDate?: Date, geo?: string) {
  // Uses proxy of https://proxymesh.com/account/dashboard/ => ip4 has to be inserted on site
  let proxyAgent = new HttpsProxyAgent('http://us-wa.proxymesh.com:31280');

  const db: MongoGenericDAO<Trend> = app.locals.trendDAO;
  try {
    const trends = await db.findAll({ keywordId: keyword.id, type: 'daily' });
    const latestTrend = trends.find(e => (e.date.getMonth() === new Date().getMonth() + 1 && e.date.getFullYear() === new Date().getFullYear()));

    // Update only new month
    if (!latestTrend && trends.length > 0) {
      console.log("Update new day");
    }

    // Update all
    else if (!trends.length && !latestTrend && !retried) {
      console.log("Update all days of " + keyword.keyword);

      const results = await googleTrends.interestOverTime(
        {
          agent: proxyAgent,
          keyword: keyword.keyword,
          startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
          endTime: new Date(),
          geo: geo ? geo : ''
        });

      const result: any[] = JSON.parse(results).default.timelineData;

      let lastValue = 0;
      let lastDiffAgg = 0;

      console.log(result[0]);
      console.log(result[result.length -2]);
      console.log(result[result.length -1]);

      // result.forEach(async (jsonObject, index) => {

      //   const date = new Date(jsonObject["formattedAxisTime"]);
      //   date.setMonth(date.getMonth() + 1);
      //   date.setDate(1);

      //   let diffValue = jsonObject["value"][0] - lastValue;

      //   // Increases aggregated diff if last one was positive and diff Value is positie too, else sets to 0
      //   lastDiffAgg >= 0 && diffValue >= 0 ? lastDiffAgg += diffValue : lastDiffAgg = 0;

      //   // Because otherwise it´s often directly 100
      //   index === 0 ? lastDiffAgg = lastDiffAgg / 2 : '';

      //   const monthTrend: Partial<Trend> = {
      //     keywordId: keyword.id,
      //     keyword: keyword.keyword,
      //     type: 'monthly',
      //     formattedTime: jsonObject["formattedTime"],
      //     value: jsonObject["value"][0],
      //     diffValue: diffValue,
      //     diffValueAgg: lastDiffAgg,
      //     time: jsonObject["time"],
      //     date: date
      //   }

      //   lastValue = jsonObject["value"][0];


      //   // console.log(monthTrend);
      //   await db.create(monthTrend);

      // });

      console.log(`Finished monthly ${keyword.keyword}!`);
    }
    else {
      console.log("No update needed of " + keyword.keyword);
    }


  } catch (error) {
    // Retry once
    console.log(retried);
    console.log("Do retry for " + keyword.keyword);
    await saveMonthlyTrends(app, keyword, startDate, endDate, geo);
    retried = true;
    console.log(error);

  }
}