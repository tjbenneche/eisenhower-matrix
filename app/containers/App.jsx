import React, { PropTypes } from 'react';

const App = React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;

