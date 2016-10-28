import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import './main.scss';

render(
  <Provider>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
