import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import startDB from './db';
import { Keyword } from './models/keyword';
import { MongoGenericDAO } from './models/mongo-generic.dao';

const port = 3000;



async function start() {
  const app = express();
  await startDB(app);
  const db:MongoGenericDAO<Keyword> = app.locals.keywordDAO;
  const words = await db.findAll();
  console.log(words);
}


start();
