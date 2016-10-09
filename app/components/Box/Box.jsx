import React, { Component } from 'react';
import styles from './Box.css';
import ListItem from '../ListItem/ListItem';

const Box = React.createClass({
  getInitialState() {
    return {
      taskData: []
    };
  },
  propTypes: {
    boxTitle: React.PropTypes.string,
    boxId: React.PropTypes.string
  },
  handleAddNewClick(){
    this.setState({ 
        taskData: this.state.taskData.concat([
          {          
            box: this.props.boxId, 
            task : "added by click", 
            completed: false
          }
      ])
    });  
  }, 
  getItems() {
    const data = this.state.taskData;
    const rows = [];

    data.forEach(function(dataItem){
      rows.push(
        <ListItem              
          isComplete={dataItem.completed}
          key={dataItem._id} 
          itemTitle={dataItem.task} 
        />)
    });
    return rows;
  },
  render() {
    return (
        <div> 
          <div>
            <div className={styles.box}>
              <div className={styles.box_header}>  
                <h2 className={styles.box_title}>{this.boxTitle}</h2>
                <h5 className={styles.box_item_count}></h5>
              </div>
              <div>
                <div className={styles.list_container}>
                  <button className="add-new" onClick={this.handleAddNewClick}>Add New</button>
                  <ul className={styles.list}>{this.getItems()}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = Box;
