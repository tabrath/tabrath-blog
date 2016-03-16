import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
        <nav className="top-nav blue-grey">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="page-title">tabrath-blog</a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
};