import React from 'react';
import { 
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  ConnectDropTarget,
  DropTargetCollector,
} from 'react-dnd';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from '../ItemTypes';
import Overlay from './Overlay';



// types for props BoardSquare:
export interface BoardSquareProps {
  x: number,
  y: number,
  children: any
}

// interface for drag'n'drop:
interface CollectedProps {
  isOver: boolean,
  canDrop: boolean,
  connectDropTarget: ConnectDropTarget
}

// drop target spec that only handles 'drop event':
const squareTarget = {
  canDrop(props: BoardSquareProps) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props: BoardSquareProps) {
    // In a real app, I might also use monitor.getItem() 
    // to retrieve the dragged item that the drag source returned from beginDrag
    moveKnight(props.x, props.y);
  }
};

// inject props into BoardSquare:
const collect: DropTargetCollector<CollectedProps> = (
  connect: DropTargetConnector, 
  monitor: DropTargetMonitor
) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(), // draggable находится над данным элементом
    canDrop: monitor.canDrop()
  };
};

class BoardSquare extends React.Component<BoardSquareProps & CollectedProps> {
  public render() {
    const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <Square black={black}>
          {children}
        </Square>
        {isOver && !canDrop && <Overlay color="red" />}
        {!isOver && canDrop && <Overlay color="yellow" />}
        {isOver && canDrop && <Overlay color="green" />}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);