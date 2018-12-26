import React from 'react';

export interface SquareProps {
	black: boolean
	children: JSX.Element
};

const squareStyle = {
	width: '100%',
	height: '100%',
};

const Square: React.SFC<SquareProps> = ({ black, children }) => {
	const backgroundColor = black ? 'black' : 'white';
	const color = black ? 'white' : 'black';
	return (
		<div
			style={{
				...squareStyle,
				color,
				backgroundColor,
			}}
		>
			{children}
		</div>
	)
}

export default Square;