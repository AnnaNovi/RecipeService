import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
require('dotenv').config();

import { userRouter } from './router/user-router';
import { errorMiddleware } from './middlewares/error-middleware';

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', userRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
    }
    app.listen(PORT, () => {
      console.log(`server started on port = ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
