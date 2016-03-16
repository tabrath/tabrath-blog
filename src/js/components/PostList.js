import React from 'react';
import PostStore from '../stores/PostStore';
import PostItem from './PostItem';
import Pagination from './Pagination';

export default class PostList extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      posts: [],
      page: 0,
      pages: 0
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  fetch(page) {
    PostStore.getAll(page, (error, data) => {
      this.setState({ error, posts: data.posts, page: data.page, pages: data.pages });
    });
  }

  componentDidMount() {
    this.fetch(this.state.page);
  }

  onPageChange(page) {
    this.fetch(page);
  }

  render() {
    let items = this.state.posts.map(post => (<PostItem post={post} key={post._id} />));
    let error = this.state.error ? (<h3>this.state.error</h3>) : '';

    return (
      <div>
        {error}
        {items}
        <Pagination page={this.state.page} pages={this.state.pages} onChange={this.onPageChange} />
      </div>
    );
  }
};