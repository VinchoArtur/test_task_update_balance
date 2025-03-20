const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./public/src/routes/index');
const errorMiddleware = require('./public/src/middlewares/errors/errorMiddleware');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100000,
    message: 'Слишком много запросов, попробуйте позже.',
});

const app = express();


app.use(limiter);


app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(routes);
app.use(errorMiddleware);
module.exports = app;

