import * as React from 'react';
import { 
  DragSource,
  ConnectDragSource,
  ConnectDragPreview,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceCollector,
} from 'react-dnd';
import knightImage from '../knightImage';
import { ItemTypes } from '../ItemTypes';

// style for the knight:
const knightStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move'
};

// DRAGnDROP functional description:
// -------------------------------------------------
// drag source specification:
// if there were more than one draggable then we would return:
// { pieceId: props.id }
const knightSource = {
  beginDrag() {
    return {};
  }
};

export interface IKnightProps {
  connectDragSource: ConnectDragSource,
  connectDragPreview: ConnectDragPreview,
  isDragging?: boolean
}

// function for injecting props in Knight;
const collect: DragSourceCollector<IKnightProps> = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
  ) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging() 
})

// instead of named props-parametres we use interface <IKnightProps>:
class Knight extends React.Component<IKnightProps> {
  // after re-render draw the knight image
  public componentDidMount() {
    const img = new Image();
    img.src = knightImage;
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img);
  }

  public render(){
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        ...knightStyle,
        opacity: isDragging ? 0.5 : 1,
      }}
      >
        ♘
      </div>
    );
  }
}

// high-order component:
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);