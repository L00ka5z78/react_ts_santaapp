import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import * as bodyParser from 'body-parser';
import {handleError} from './utils/error';
import {homeRouter} from './routers/home';
import {childRouter} from './routers/child';
import {giftRouter} from './routers/gift';
import {userRouter} from "./routers/userRouter";
import './utils/db';
import * as cookieParser from 'cookie-parser';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'DELETE'],
        credentials: true,
    })
);
app.use(express.json()); //Content-type: application/json

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);
app.use('/user', userRouter);

app.use(handleError);
// app.post('/register', userRouter)
// app.post('/login', userRouter)

app.listen(3001, 'localhost', () => {
    console.log('Server is ON and running on http://localhost:3001');
});
