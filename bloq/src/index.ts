import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/bloq.routes';

dotenv.config();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || '';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

const start = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log('BLOQ-MONGO connection estabilished.');

    app.listen(port, () => {
      console.log(`BLOQ-SERVICE is running on port ${port}.`);
    });
  } catch (error) {
    console.log('Error starting the server.');
  }
};

start();
