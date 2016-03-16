import React from 'react';

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <footer className="page-footer blue-grey">
        <div className="container">
          <div className="row">
            <div className="col s8">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">You can use rows and columns</p>
            </div>
            <div className="col s4">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a href="http://www.github.com/tabrath" className="grey-text text-lighten-3">GitHub</a></li>
                <li><a href="http://www.twitter.com/tabrath" className="grey-text text-lighten-3">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            &copy; 2016 Trond Arne Bråthen
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
};