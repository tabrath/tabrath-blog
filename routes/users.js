const express = require('express');
const User = require('../models/user');
const auth = require('../lib/auth');

var route = express.Router();

route.get('/', (req, res) => {
  User.find({}, { password: 0 })
    .populate('posts', 'title description')
    .exec((err, users) => {
      if (err) return res.sendStatus(500, err);

      res.json(users);
    });
});

route.get('/:id', (req, res) => {
  User.findById(req.params.id, { password: 0 })
    .populate('posts', 'title description')
    .exec((err, user) => {
      if (err) return res.sendStatus(500, err);

      res.json(user);
    });
});

route.post('/', auth, (req, res) => {
  var user = new User(req.body);
  user.save((err) => {
    if (err) return res.sendStatus(500, err);

    res.sendStatus(200);
  });
});

route.put('/:id', auth, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.sendStatus(500, err);

    Object.keys(req.body).forEach(key => {
      if (user[key] && user[key] !== req.body[key])
        user[key] = req.body[key];
    });

    user.save((err) => {
      if (err) return res.sendStatus(500, err);

      res.sendStatus(200);
    });
  });
});

route.delete('/:id', auth, (req, res) => {
  User.remove({ _id: req.params.id }, (err) => {
    if (err) return res.sendStatus(500, err);

    res.sendStatus(200);
  });
});

module.exports = route;
