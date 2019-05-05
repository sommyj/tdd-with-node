import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import route from './server/route';

//Setup express app
const app = express();

// log request to console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require our route into our application
route(app);

//Setup a default catch all route to send a welcome message
app.get('*', (req, res)=> res.status(200).send({
  message : 'Welcome to the beginning of nothingness'
}));

export default app;
