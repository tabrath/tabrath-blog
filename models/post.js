const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: User, required: true },
  dateCreated: { type: Date, required: true },
  dateModified: { type: Date },
  content: { type: String, required: true },
  comments: [{
    body: { type: String, required: true },
    author: { type: User, required: true },
    dateCreated: { type: Date, required: true },
    dateModified: { type: Date }
  }]
});

module.exports = mongoose.model('Post', PostSchema);
