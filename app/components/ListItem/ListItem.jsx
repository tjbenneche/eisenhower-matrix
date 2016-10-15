import React, { Component } from 'react';
import styles from './ListItem.css';

const ListItem = React.createClass({
  getInitialState(){
    return {
      completed: false
    }
  },
  propTypes: {
    itemTitle: React.PropTypes.string,
  },
  handleCheck(event){
    console.log('checked');
  },
  render() {
    return (
      <div>
        <li className={styles.list_item}>
          <input 
            className={this.state.completed ? styles.list_item_completed : styles.list_item}
            type="checkbox" 
            onChange={this.handleCheck} />
          {this.props.itemTitle}
        </li>
      </div>
    );
  }
});

module.exports = ListItem;
