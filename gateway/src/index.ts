import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import bloqRouter from './bloq/routes/bloq.routes';
import lockerRouter from './locker/routes/locker.routes';
import rentsRouter from './rent/routes/rent.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// middlewares
app.use(json());
app.use(express.urlencoded({ extended: true }));

// connect routes
app.use('/api/bloqs', bloqRouter);
app.use('/api/lockers', lockerRouter);
app.use('/api/rents', rentsRouter);

const start = async () => {
  try {
    // start server
    app.listen(port, () => {
      console.log(`API GATEWAY is running on port ${port}`);
    });
  } catch (error) {
    console.log('Error starting API GATEWAY.');
  }
};

start();
