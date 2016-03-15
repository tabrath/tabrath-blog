const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const dispatcher = require('./lib/dispatcher');
const EVENT = require('./lib/constants').EVENT;
const User = require('./models/user');

dispatcher.on(EVENT.POST_CREATED, (id) => {
  console.log('post created', id);
});

const mongodb_username = process.env.MONGODB_USERNAME || 'tabrath-blog';
const mongodb_password = process.env.MONGODB_PASSWORD || 'tabrath-blog';
const mongodb_host = process.env.MONGODB_HOST || '192.168.10.176';
const mongodb_port = process.env.MONGODB_PORT || 27017;
const mongodb_database = process.env.MONGODB_DATABASE || 'tabrath-blog';

var app = express();

mongoose.connect(`mongodb://${mongodb_username}:${mongodb_password}@${mongodb_host}:${mongodb_port}/${mongodb_database}`, (err) => {
  if (err) return console.error(err);

  function initialized() {
    app.use(morgan('dev'));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api/users', routes.users);
    app.use('/api/posts', routes.posts);

    app.get('*', (req, res) => {
      res.json({ message: 'hello world' });
    });

    app.emit('ready');
  }

  // ensure we got at least one user (admin:admin)
  User.find({}, (err, users) => {
    if (err || !users || users.length === 0) {
      var admin = new User({ email: 'admin@localhost', password: 'admin', name: 'Administrator' });
      admin.save((err) => {
        if (err) return console.error(err);

        console.log('Database was empty, created administrator user account: ', admin);

        return initialized();
      });
    } else
      return initialized();
  });
});

module.exports = app;