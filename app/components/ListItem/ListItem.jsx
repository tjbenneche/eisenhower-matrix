import React, { Component } from 'react';
import styles from './ListItem.css';

const ListItem = React.createClass({
  propTypes: {
    isComplete: React.PropTypes.bool,
    itemTitle: React.PropTypes.string,
    itemId: React.PropTypes.string,
    placeholderText: React.PropTypes.string
  },
  handleAddNewClick(){
    alert('clicked');
  }, 
  render() {
    const title = this.props.itemTitle;
    const itemKey = this.props.itemId;
    const didComplete = this.props.isComplete;

    return (
      <div>
        <li className={styles.list_item} key={itemKey}>{title}<span>{didComplete}</span></li>
      </div>
    );
  }
});

module.exports = ListItem;
