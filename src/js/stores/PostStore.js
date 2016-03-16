import { EventEmitter } from 'events';
import jsonist from 'jsonist';

class PostStore extends EventEmitter {
  constructor() {
    super();

    this._cache = {
      pages: [],
      posts: {}
    };
  }

  getAll(page, callback) {
    if (typeof page === 'function') {
      callback = page;
      page = 0;
    }

    if (this._cache.pages[page])
      return callback(null, this._cache.pages[page]);

    jsonist.get(`http://${window.location.host}/api/posts?page=${page}`, {}, (err, data, res) => {
      if (err) return callback(err);

      this._cache.pages[page] = data;

      return callback(null, data);
    });
  }

  get(id, callback) {
    if (this._cache.posts[id])
      return callback(null, this._cache.posts[id]);

    jsonist.get(`http://${window.location.host}/api/posts/${id}`, {}, (err, data, res) => {
      if (err) return callback(err);

      this._cache.posts[id] = data;

      return callback(null, data);
    });
  }

  clearCache() {
    this.cache = {
      pages: [],
      posts: {}
    }
  }
};

export default new PostStore();
