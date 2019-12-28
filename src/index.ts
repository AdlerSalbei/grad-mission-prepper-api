import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';

import PrepperRouter from './routes/prepper';

const app = express();

app.use(cors({
    credentials: true,
    origin: [
        new RegExp('gruppe-adler\.de$', 'i'),
        new RegExp('localhost:[0-9]+$', 'i'),
        new RegExp('127.0.0.1:[0-9]+$', 'i'),
        new RegExp('127.0.0.1$', 'i'),
        new RegExp('localhost$', 'i')
    ]
}));


// body parser
app.use(bodyParser.json());

// logger
app.use(morgan('short'));

const {
    PORT = 3000
} = process.env;

app.use('/', PrepperRouter);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
