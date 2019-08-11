import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import startDB from './db';
import { Keyword } from './models/keyword';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { updateKeywords } from './services/updateKeywords';
import { getAbsoulteTrends } from './services/selenium/selenium.service';


let app: Express = express();

async function start() {
  await startDB(app);
}

async function main() {
  await start();
  // await updateKeywords(app);
  await getAbsoulteTrends();
}

main();