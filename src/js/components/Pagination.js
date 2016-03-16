import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    /*this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.setPage = this.setPage.bind(this);*/
  }

  previous() {
    if (this.canPrevious())
      this.props.onChange(this.props.page - 1);
  }

  canPrevious() {
    return this.props.page > 0;
  }

  next() {
    if (this.canNext())
      this.props.onChange(this.props.page + 1);
  }

  canNext() {
    return this.props.page < this.props.pages - 1;
  }

  setPage(page) {
    this.props.onChange(page);
  }

  render() {
    if (this.props.pages === 0)
      return (<div></div>);

    let pages = Array.apply(null, Array(this.props.pages)).map((_, page) => (
      <li key={page} className={this.props.page === page ? 'active' : 'waves-effect'}><a onClick={this.setPage.bind(this, page)}>{page}</a></li>
    ));

    let left = (<li className={this.canPrevious() ? 'waves-effect' : 'disabled'} onClick={this.previous.bind(this)}><i className="material-icons">chevron_left</i></li>);
    let right = (<li className={this.canNext() ? 'waves-effect' : 'disabled'} onClick={this.next.bind(this)}><i className="material-icons">chevron_right</i></li>);

    return (
      <div>
        <ul className="pagination center-align">
          {left}
          {pages}
          {right}
        </ul>
      </div>
    );
  }
};

Pagination.propTypes = {
  page: React.PropTypes.number.isRequired,
  pages: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};
