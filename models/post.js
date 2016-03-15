const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user').Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: UserSchema, required: true },
  dateCreated: { type: Date, required: true },
  dateModified: { type: Date },
  content: { type: String, required: true },
  comments: [{
    body: { type: String, required: true },
    author: { type: UserSchema, required: true },
    dateCreated: { type: Date, required: true },
    dateModified: { type: Date }
  }]
});

module.exports = mongoose.model('Post', PostSchema);
module.exports.Schema = PostSchema;
