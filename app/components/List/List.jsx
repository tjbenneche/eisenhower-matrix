import React, { Component } from 'react';
import styles from './List.css';
import ListItem from '../ListItem/ListItem';

const List = React.createClass({
  propTypes: {
    boxTitle: React.PropTypes.string,
    listData: React.PropTypes.array
  },
  handleAddNewClick(){
    alert('clicked');
  }, 
  render() {
    const data = this.props.listData;
    const numRows = data.length;
    const rows = [];

    data.forEach(function(dataItem){
      rows.push(
        <ListItem              
          isComplete={dataItem.complete}
          itemId={dataItem.id} 
          itemTitle={dataItem.task} 
        />)
    });

    return (
      <div>
        <div className={styles.list_container}>
          <button className="add-new" onClick={this.handleAddNewClick}>Add New</button>
          <ul className={styles.list}>{rows}</ul>
        </div>
      </div>
    );
  }
});

module.exports = List;
