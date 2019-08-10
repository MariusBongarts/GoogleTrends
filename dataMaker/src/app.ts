import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import startDB from './db';
import { Keyword } from './models/keyword';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { updateKeywords } from './services/updateData';


let app: Express = express();

async function start() {
  await startDB(app);
}

async function main() {
  await start();
  // await updateKeywords(app);
  const db:MongoGenericDAO<Keyword> = app.locals.keywordDAO;
  const words = await db.findAll();
  console.log(words);
}

main();