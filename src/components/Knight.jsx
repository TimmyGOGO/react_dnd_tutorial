import * as React from 'react';
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';

// drag source specification:
// if there were more than one draggable then we would return:
// { pieceId: props.id }
const knightSource = {
  beginDrag(props) {
    return {};
  }
};

// function for injecting props in Knight;
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

// there are named parametres instead of props:
function Knight({ connectDragSource, isDragging }) {
  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 40,
      fontWeight: 'bold',
      cursor: 'move'
    }}>
      ♘
    </div>
  );
}

// high-order component:
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);