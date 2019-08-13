import { SearchVolume } from './models/searchVolume';
import { Keyword } from './models/keyword';
import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { Trend } from './models/trend';


export default async function startDB(app: Express) {

  const url = 'mongodb://0.0.0.0:27017/googleTrends';
  // const options = {
  //   useNewUrlParser: true,
  //   auth: { user: 'Marius', password: 'Marius' },
  //   authSource: 'myDB'
  // };
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('googleTrends');
    console.log("Successfully connected to MongoDB")
    app.locals.keywordDAO = new MongoGenericDAO<Keyword>(db, 'keywords');
    app.locals.trendDAO = new MongoGenericDAO<Trend>(db, 'trends');
    app.locals.searchVolumeDAO = new MongoGenericDAO<SearchVolume>(db, 'searchVolume');
  }catch(err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }

}
