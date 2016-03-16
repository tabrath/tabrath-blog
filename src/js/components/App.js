import React from 'react';

import Header from './Header';
import Footer from './Footer';
import PostList from './PostList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            {this.props.children}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};
