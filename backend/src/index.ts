import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local'),
});
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan('tiny'));
app.use(router);
app.use('/media', express.static('media'));

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
