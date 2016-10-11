import React, { Component } from 'react';
import styles from './Box.css';
import ListItem from '../ListItem/ListItem';

const Box = React.createClass({
  getInitialState() {
    return {
      taskData: [],
      value: ""
    };
  },
  propTypes: {
    boxTitle: React.PropTypes.string,
    boxId: React.PropTypes.string
  },
  handleAddTaskClick(){
    this.setState({ 
        taskData: this.state.taskData.concat([
          {          
            box: this.props.boxId, 
            task : this.state.value, 
            completed: false
          }
      ])
    }, function(){
      // clear field
      this.refs.task_entry.value = '';
    });  
  }, 
  handleChange(event) {
    var val = event.target.value;
    this.setState({value: val});
  },
  getItems() {
    const data = this.state.taskData;
    const rows = [];

    data.forEach(function(dataItem){
      rows.push(
        <div>
          <ListItem              
            isComplete={dataItem.completed}
            key={dataItem._id} 
            itemTitle={dataItem.task} 
          />
        </div>
      );
    });
    return rows;
  },
  render() {
    return (
        <div className={styles.box}> 
          <div className={styles.box_header}>  
            <h2 className={styles.box_title}>{this.props.boxTitle}</h2>
            <button className="add-new" onClick={this.handleAddTaskClick}>+</button>
          </div>
          <div className={styles.box_inner}>
            <div className={styles.list_container}>
                <input 
                  ref="task_entry"
                  className={styles.task_entry}
                  type="text" 
                  placeholder="Enter text"
                  value={this.state.value}
                  onChange={this.handleChange} 
                />
                <ul className={styles.list}>{this.getItems()}</ul>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Box;
