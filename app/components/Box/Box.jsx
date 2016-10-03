import React, { Component } from 'react';
import List from '../List/List';
import styles from './Box.css';

const Box = React.createClass({
  getInitialState() {
    return {
      totalListItems: 21,
      incompleteListItems: 2,
      impUrg: [
          {
            id: "00001",
            task: "Apply for job",
            complete: false
          },
          {
            id: "00002",
            task: "Eat breakfast",
            complete: true
          },
          {
            id: "00003",
            task: "Go to work",
            complete: false
          },
          {
            id: "00004",
            task: "Organize notes",
            complete: false
          }
      ],
      impNoUrg: [
        {
          id: "00005",
          task: "Dry cleaners",
          complete: true
        },
        {
          id: "00006",
          task: "Learn Electron",
          complete: false
        }
      ],
      noImpUrg: [
        {
          id: "00007",
          task: "Tesk task",
          complete: false
        }
      ],
      noImpNoUrg: [
        {
          id: "00008",
          task: "Sample task",
          complete: false
        }
      ]
    };
  },
  propTypes: {
    boxTitle: React.PropTypes.string,
    boxId: React.PropTypes.string,
    listData: React.PropTypes.array
  },
  render() {
    const boxArray = this.props.boxId;
    const totalBoxItems = boxArray.length;

    return (
      <div>
        <div>
          <div className={styles.box}>
            <div className={styles.box_header}>  
              <h2 className={styles.box_title}>{this.props.boxTitle}</h2>
              <h5 className={styles.box_item_count}>{totalBoxItems}</h5>
            </div>
            <List listData={this.state[boxArray]}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Box;
