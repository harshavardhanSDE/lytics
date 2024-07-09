import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { Kafka, Partitioners } from 'kafkajs'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const kafka = new Kafka({
  clientId: 'analytics-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});

const runProducer = async () => {
  await producer.connect();
};

runProducer().catch(console.error);

app.post('/events', async (req, res) => {
  const event = req.body;
  await producer.send({
    topic: 'analytics-events',
    messages: [
      { value: JSON.stringify(event) }
    ],
  });
  res.status(201).send('Event received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
