import React from 'react';
import PostStore from '../stores/PostStore';
import PostItem from './PostItem';

export default class PostList extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      posts: []
    };
  }

  componentDidMount() {
    PostStore.getAll((error, posts) => {
      this.setState({ error, posts });
    });
  }

  render() {
    let items = this.state.posts.map(post => (<PostItem post={post} key={post._id} />));
    let error = this.state.error ? (<h3>this.state.error</h3>) : '';

    return (
      <div>
        {error}
        {items}
      </div>
    );
  }
};