import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './components/Knight';
import Square from './components/Square';
import Board from './components/Board';
import { observe } from './components/Game';

const root = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    root
  )
);
