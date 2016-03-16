import { EventEmitter } from 'events';
import jsonist from 'jsonist';

class PostStore extends EventEmitter {
  constructor() {
    super();
  }

  getAll(callback) {
    jsonist.get('http://' + window.location.host + '/api/posts', {}, (err, data, res) => {
      if (err) return callback(err);

      return callback(null, data);
    });
  }

  get(id, callback) {
    jsonist.get('http://' + window.location.host + '/api/posts/' + id, {}, (err, data, res) => {
      if (err) return callback(err);

      return callback(null, data);
    });
  }
};

export default new PostStore();
