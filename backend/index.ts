import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import { handleError } from './utils/error';
import { homeRouter } from './routers/home';
import { childRouter } from './routers/child';
import { giftRouter } from './routers/gift';
// import authRouter from './routers/auth';
import * as cookieParser from 'cookie-parser';
import './utils/db';
import {userRouter} from "./routers/userRouter";

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true,
  })
);

// cors({
//   origin: 'http://localhost:3000',
//   methods: ['POST', 'PUT', 'GET', 'DELETE'],
//   credentials: true,
// }),

app.use(express.json()); //Content-type: application/json
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);
// app.use('/auth', authRouter);
app.use('/auth', userRouter);

app.use(handleError);

app.listen(3001, 'localhost', () => {
  console.log('Server is ON and running on http://localhost:3001');
});
