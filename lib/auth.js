const User = require('../models/user');
const basicAuth = require('basic-auth');

module.exports = function(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }

  var req_user = basicAuth(req);

  if (!req_user || !req_user.name || !req_user.pass) {
    return unauthorized(res);
  }

  User.findOne({ email: req_user.name }, (err, user) => {
    if (err) return unauthorized(res);

    if (req_user.pass !== user.password)
      return unauthorized(res);

    delete user.password;

    req.user = user;

    next();
  });
};