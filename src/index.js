import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './components/Knight';
import Square from './components/Square';

ReactDOM.render(
  <Square black>
    <Knight />
  </Square>, 
  document.getElementById('root')
);
