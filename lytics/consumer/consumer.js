import { Kafka } from 'kafkajs';
import { MongoClient } from 'mongodb';

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const mongoUri = 'mongodb://127.0.0.1:27017/';
const dbName = 'events-analytics';
const collectionName = 'events';

let collection;
let client;

const run = async () => {
  try {
    // Connect to MongoDB
    client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(collectionName);

    await consumer.connect();

    await consumer.subscribe({ topic: 'analytics-events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!collection) {
          console.error('MongoDB collection is not initialized');
          return;
        }

        const data = {
          value: message.value.toString(),
        };

        console.log(data);

        try {
          await collection.insertOne(data);
          console.log('Message inserted into MongoDB');
        } catch (error) {
          console.error('Error inserting message into MongoDB', error);
        }
      },
    });
  } catch (error) {
    console.error('Error connecting to MongoDB or Kafka', error);
  }

  process.on('exit', async () => {
    if (client) {
      await client.close();
    }
  });
};

run().catch(console.error);
