import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from './components/App';
import PostList from './components/PostList';
import Post from './components/Post';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/posts" />
      <Route path="posts" component={PostList} />
      <Route path="posts/:id" component={Post} />
    </Route>
  </Router>,
  document.getElementById('root')
);
