const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dispatcher = require('../lib/dispatcher');
const EVENT = require('../lib/constants').EVENT;

const UserSchema = new Schema({
  email: { type: String, required: true/*, unique: true*/ },
  password: { type: String, required: true },
  avatar: { type: String },
  name: { type: String, required: true }
});

UserSchema.post('save', function(user) {
  dispatcher.emit(EVENT.USER_CREATED, user._id);
});

UserSchema.post('update', function(user) {
  dispatcher.emit(EVENT.USER_UPDATED, user._id);
});

UserSchema.post('remove', function(user) {
  dispatcher.emit(EVENT.USER_DELETED, user._id);
});

module.exports = mongoose.model('User', UserSchema);
