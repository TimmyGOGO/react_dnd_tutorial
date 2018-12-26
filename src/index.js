import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './components/Knight';
import Square from './components/Square';
import Board from './components/Board';

ReactDOM.render(
  <Board knightPosition={[7, 4]} />,
  document.getElementById('root')
);
