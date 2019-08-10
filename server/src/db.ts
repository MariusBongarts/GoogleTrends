import { Keyword } from './models/keyword';
import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { User } from './models/user';
import { resolve } from 'url';
import { Entry } from './models/entry';

export default async function startDB(app: Express) {
  // const url = 'mongodb://mongodb:27017/myDB';

  // Connects to mongo db on host system
  const url = 'mongodb://host.docker.internal:27017/googleTrends';

  // const options = {
  //   useNewUrlParser: true,
  //   auth: { user: 'Marius', password: 'Marius' },
  //   authSource: 'myDB'
  // };
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('googleTrends');
    app.locals.keywordDAO = new MongoGenericDAO<Keyword>(db, 'keywords');
  }catch(err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }

}
