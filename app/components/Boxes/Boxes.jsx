import React, { Component } from 'react';
import { Link } from 'react-router';
import Box from '../Box/Box';
import styles from './Boxes.css';

const Boxes = React.createClass({
  render() {  
    return (
      <div>
        <div className={styles.row}>
          <Box boxId="impUrg" boxTitle="Important & Urgent"/>
          <Box boxId="impNoUrg" boxTitle="Important & Not Urgent"/>
        </div>
        <div className={styles.row}>
          <Box boxId="noImpUrg" boxTitle="Not Important & Urgent"/>
          <Box boxId="noImpNoUrg" boxTitle="Not Important & Not Urgent"/>
        </div>
      </div>
    );
  }
});

module.exports = Boxes