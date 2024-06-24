import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import router from './routes/rent.routes';

dotenv.config();
const port = process.env.PORT || 3002;
const mongoUri = process.env.MONGO_URI || '';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

const start = async () => {
  try {
    await mongoose.connect(mongoUri);

    console.log('RENT-MONGO connection estabilished.');

    app.listen(port, () => {
      console.log(`RENT-SERVICE is running on port ${port}.`);
    });
  } catch (error) {
    console.log('Error starting RENT-SERVICE.');
  }
};

start();
