import React, { Component } from 'react';
import { Link } from 'react-router';
import BoxContainer from '../Box/BoxContainer'

const Boxes = React.createClass({
  render() {  
    return (
      <div>
        <div className="row top">
          <BoxContainer boxId="impUrg" boxTitle="Important & Urgent"/>
          <BoxContainer boxId="impNoUrg" boxTitle="Important & Not Urgent"/>
        </div>
        <div className="row bottom">
          <BoxContainer boxId="noImpUrg" boxTitle="Not Important & Urgent"/>
          <BoxContainer boxId="noImpNoUrg" boxTitle="Not Important & Not Urgent"/>
        </div>
      </div>
    );
  }
});

module.exports = Boxes