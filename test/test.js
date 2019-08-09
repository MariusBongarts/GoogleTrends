const MongoClient = require('mongodb')

const url = 'mongodb://0.0.0.0:27018/myDB';

// const options = {
//   useNewUrlParser: true,
//   auth: { user: 'Marius', password: 'Marius' },
//   authSource: 'myDB'
// };

async function startDB() {
  try {
    const client = await MongoClient.connect(url);
    console.log("Successfully connected");
    const db = client.db('myDB');
    const col = db.collection('keywords');
    const result = await col.find().toArray();
    console.log(result);
  } catch (err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }
}

startDB();

