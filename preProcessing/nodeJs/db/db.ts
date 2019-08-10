import { Keyword } from './../models/keyword';
import { MongoGenericDAO } from './dbModels/mongo-generic.dao';
import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { resolve } from 'url';

export default async function startDB() {
  const url = 'mongodb://0.0.0.0:27017/myDB';
  // const options = {
  //   useNewUrlParser: true,
  //   auth: { user: 'Marius', password: 'Marius' },
  //   authSource: 'myDB'
  // };
    const client = await MongoClient.connect(url,{ useNewUrlParser: true });
    const db = client.db('myDB');
    const keywordDAO = new MongoGenericDAO<Keyword>(db, 'keywords');
    return keywordDAO;
}
