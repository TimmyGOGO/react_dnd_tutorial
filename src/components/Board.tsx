import * as React from 'react';
import styled from 'styled-components';
import Knight from './Knight';
// import Square from './Square';
// import { canMoveKnight, moveKnight } from './Game';
// import { DragDropContextProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';

export interface BoardProps {
  knightPosition: [number, number]
} 

// for styled-components:
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;


export default class Board extends React.Component<BoardProps> {
  public render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return <Container>{squares}</Container>;
  }

  private renderSquare(i: number) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  private renderPiece(x: number, y: number) {
    const [knightX, knightY] = this.props.knightPosition;
    const isKnightHere = x === knightX && y === knightY;
    return isKnightHere ? <Knight /> : null;

  }
}