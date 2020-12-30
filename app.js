require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./utils/rateLimiter');
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { DATABASE_ADDRESS } = require('./utils/constants');

const app = express();

app.use(limiter);
app.use(helmet());
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
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(3000);
