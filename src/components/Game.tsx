

// export function observe(receive) {
//   setInterval(() => receive([
//     Math.floor(Math.random() * 8),
//     Math.floor(Math.random() * 8)
//   ]), 500);
// }

let knightPosition: [number, number] = [1, 7];
let observers: PositionObserver[] = [];
export type PositionObserver = ((position: [number, number]) => void) | null;

function emitChange() {
	observers.forEach(o => o && o(knightPosition))
}

export function observe(o: PositionObserver) {
	observers.push(o)
	emitChange()

	return () => {
		observers = observers.filter(t => t !== o)
	}
}

export function canMoveKnight(toX: number, toY: number) {
	const [x, y] = knightPosition
	const dx = toX - x
	const dy = toY - y

	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	)
}

export function moveKnight(toX: number, toY: number) {
	knightPosition = [toX, toY]
	emitChange()
}