const express = require('express');
const Post = require('../models/post');

var route = express.Router();

route.get('/', (req, res) => {
  Post.find({}, { content: 0, comments: 0 }, (err, posts) => {
    if (err) return res.sendStatus(500, err);

    res.json(posts);
  });
});

route.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.sendStatus(500, err);

    res.json(post);
  });
});

route.post('/', (req, res) => {
  var post = new Post(req.body);
  post.save((err) => {
    if (err) return res.sendStatus(500, err);

    res.sendStatus(200);
  });
});

route.put('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return res.sendStatus(500, err);

    Object.keys(req.body).forEach(key => {
      if (post[key] && post[key] !== req.body[key])
        post[key] = req.body[key];
    });

    post.save((err) => {
      if (err) return res.sendStatus(500, err);

      res.sendStatus(200);
    });
  });
});

route.del('/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, (err) => {
    if (err) return res.sendStatus(500, err);

    res.sendStatus(200);
  });
});

module.exports = route;
