import React from 'react';

import PostStore from '../stores/PostStore';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      post: {
        author: {}
      }
    };
  }

  componentDidMount() {
    PostStore.get(this.props.params.id, (error, post) => {
      this.setState({ error, post });
    });
  }

  render() {
    let mailto = 'mailto:' + this.state.post.author.email;

    return (
      <article>
        <h2>{this.state.post.title}</h2>
        <h5>By <a href={mailto}>{this.state.post.author.name}</a> at {this.state.post.dateCreated}</h5>
        <p className="flow-text">{this.state.post.content}</p>
      </article>
    );
  }
};