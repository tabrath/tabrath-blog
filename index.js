const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const mongodb_host = process.env.MONGODB_HOST || 'localhost';
const mongodb_port = process.env.MONGODB_PORT || 27100;
const mongodb_database = process.env.MONGODB_DATABASE || 'tabrath-blog';

mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_database}`);

var app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', routes.users);
app.use('/api/posts', routes.posts);

app.get('*', (req, res) => {
  res.json({ message: 'hello world' });
});

module.exports = app;