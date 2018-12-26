import * as React from 'react';
import Knight from './Knight';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';

export default function Board({knightPosition}) {
    function renderSquare(i, [knightX, knightY]) {
      const x = i % 8;
      const y = Math.floor(i / 8);
      const isKnightHere = (x === knightX && y === knightY)
      const black = (x + y) % 2 === 1;
      const piece = isKnightHere ? <Knight /> : null;
    
      return (
        <div 
          key={i} 
          style={{ width: '12.5%', height: '12.5%' }}
          onClick={() => handleSquareClick(x, y)}>
          <Square black={black}>
            {piece}
          </Square>
        </div>
      );
    }

    function handleSquareClick(toX, toY) {
      if (canMoveKnight(toX, toY)) {
        moveKnight(toX, toY);
      }
    }

    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(renderSquare(i, knightPosition));
    }
  
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
};