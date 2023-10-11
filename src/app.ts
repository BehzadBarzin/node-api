import express, { json } from 'express';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';

const port = config.get<number>('port');

const app = express();

app.use(json());

app.listen(port, async () => {
    await connect();

    routes(app);
    
    log.info(`App Running on port ${port}!`);
});