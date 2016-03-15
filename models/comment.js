const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dispatcher = require('../lib/dispatcher');
const EVENT = require('../lib/constants').EVENT;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: { type: Date, required: true },
  dateModified: { type: Date }
});

CommentSchema.post('save', function(comment) {
  dispatcher.emit(EVENT.COMMENT_CREATED, comment._id);
});

CommentSchema.post('update', function(post) {
  dispatcher.emit(EVENT.COMMENT_UPDATED, comment._id);
});

CommentSchema.post('remove', function(post) {
  dispatcher.emit(EVENT.COMMENT_DELETED, comment._id);
});

module.exports = mongoose.model('Comment', CommentSchema);
