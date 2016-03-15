const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dispatcher = require('../lib/dispatcher');
const EVENT = require('../lib/constants').EVENT;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.post('save', function(post) {
  dispatcher.emit(EVENT.POST_CREATED, post._id);
});

PostSchema.post('update', function(post) {
  dispatcher.emit(EVENT.POST_UPDATED, post._id);
});

PostSchema.post('remove', function(post) {
  dispatcher.emit(EVENT.POST_DELETED, post._id);
});

module.exports = mongoose.model('Post', PostSchema);
