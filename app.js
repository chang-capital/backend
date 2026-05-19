const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const testRouter = require('./app/test/router');
const infoRouter = require('./app/info/router');
const spotRouter = require('./app/spot/router');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', testRouter);
app.use('/info', infoRouter);
app.use('/spot', spotRouter);

module.exports = app;
