import React, { Component } from 'react';
import { Link } from 'react-router';
import Box from '../Box/Box'

const Boxes = React.createClass({
  render() {  
    return (
      <div>
        <Box boxId="impUrg" boxTitle="Important & Urgent"/>
        <Box boxId="impNoUrg" boxTitle="Important & Not Urgent"/>
        <Box boxId="noImpUrg" boxTitle="Not Important & Urgent"/>
        <Box boxId="noImpNoUrg" boxTitle="Not Important & Not Urgent"/>
      </div>
    );
  }
});

module.exports = Boxes