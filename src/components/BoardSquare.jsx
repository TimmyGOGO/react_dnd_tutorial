import React from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';

// drop target spec that only handles 'drop event':
const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props, monitor) {
    // In a real app, I might also use monitor.getItem() 
    // to retrieve the dragged item that the drag source returned from beginDrag
    moveKnight(props.x, props.y);
  }
};

// inject props into BoardSquare:
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(), // draggable находится над данным элементом
    canDrop: monitor.canDrop()
  };
}


function BoardSquare({ x, y, connectDropTarget, isOver, canDrop, children }) {
  const black = (x + y) % 2 === 1;
  

  function renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  return connectDropTarget(
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>
      <Square black={black}>
        {children}
      </Square>
      {isOver && !canDrop && renderOverlay('red')}
      {!isOver && canDrop && renderOverlay('yellow')}
      {isOver && canDrop && renderOverlay('green')}
    </div>
  );
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);