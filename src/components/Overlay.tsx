import * as React from 'react';

export interface OverlayProps {
  color: string
}

// перекрытие сверху (изменение цвета полей доски)
const Overlay: React.SFC<OverlayProps> = ({ color }) => {
    return (
      <div
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }}
      />
    );
};

export default Overlay;