require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { DATABASE_ADDRESS } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use('/', routes);
app.use(() => {
  throw new NotFoundError('Requested resource not found');
});
app.use(errorLogger);
app.use(errorHandler);

app.listen(3000);
