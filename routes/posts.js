const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const auth = require('../lib/auth');

var route = express.Router();

// TODO: redo comments

function onerror(code, error, res) {
  console.error(error);
  res.sendStatus(code);
}

route.get('/', (req, res) => {
  Post.find({}, { content: 0, comments: 0 })
    .populate('author', 'email name avatar')
    .exec((err, posts) => {
      if (err) return onerror(500, err, res);

      res.json(posts);
    });
});

route.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('author', 'email name avatar')
    .exec((err, post) => {
      if (err) return onerror(500, err, res);

      res.json(post);
    });
});

route.get('/:id/comments', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
      if (err) return onerror(500, err, res);

      Comment.find({ post })
        .populate('author', 'email avatar name')
        .exec((err, comments) => {
          if (err) return onerror(500, err, res);

          res.json(post.comments);
        });
    });
});

route.post('/', auth, (req, res) => {
  var post = new Post(req.body);
  post.author = req.user;
  post.save((err) => {
    if (err) return onerror(500, err, res);

    res.sendStatus(200);
  });
});

route.post('/:id/comments', auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return onerror(500, err, res);

    var comment = new Comment(req.body);
    comment.author = req.user;
    comment.post = post;
    comment.save((err) => {
      if (err) return onerror(500, err, res);

      res.sendStatus(200);
    });
  });
});

route.put('/:id', auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return onerror(500, err, res);

    Object.keys(req.body).forEach(key => {
      if (post[key] && post[key] !== req.body[key])
        post[key] = req.body[key];
    });

    post.save((err) => {
      if (err) return onerror(500, err, res);

      res.sendStatus(200);
    });
  });
});

route.put('/:postId/comments/:commentId', auth, (req, res) => {
  Comment.findById(req.params.commentId, (err, comment) => {
    if (err) return onerror(500, err, res);

    Object.keys(req.body).forEach(key => {
      if (comment[key] && comment[key] !== req.body[key])
        comment[key] = req.body[key];
    });

    comment.save((err) => {
      if (err) return onerror(500, err, res);

      res.sendStatus(200);
    });
  });
});

route.delete('/:id', auth, (req, res) => {
  Post.remove({ _id: req.params.id }, (err) => {
    if (err) return onerror(500, err, res);

    res.sendStatus(200);
  });
});

route.delete('/:postId/comments/:commentId', auth, (req, res) => {
  Comment.remove({ _id: req.params.commentId }, (err) => {
    if (err) return onerror(500, err, res);

    res.sendStatus(200);
  });
});

module.exports = route;
