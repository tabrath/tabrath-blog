import React from 'react';
import { Link } from 'react-router';

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mailto = 'mailto:' + this.props.post.author.email;

    return (
      <article>
        <h3>{this.props.post.title}</h3>
        <h5>By <a href={mailto}>{this.props.post.author.name}</a> at {this.props.post.dateCreated}</h5>
        <p className="flow-text">{this.props.post.description}</p>
        <Link to={`/posts/${this.props.post._id}`} className="btn-flat">Read More</Link>
      </article>
    );
  }
};

PostItem.PropTypes = {
  post: React.PropTypes.object.isRequired
};