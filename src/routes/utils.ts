import { minidenticon } from 'minidenticons';

export function shuffle<T>(array: T[]) {
	let i = array.length;
	while (i--) {
		const j = Math.floor(Math.random() * i + 1);
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

export function get_twenmoji_url(emoji: string) {
	const code = [...emoji].map((char) => char.codePointAt(0)?.toString(16)).join('-');
	return `/svg/${code}.svg`;
}


export function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export const getColors = () => {
	const colors = [];
	for (let c = 0; c < 3; c++) {
		colors.push(getRandomColor());
	}
	return colors;
};
export function paint(context: CanvasRenderingContext2D) {
	const colors = getColors();
	context.fillRect(1, 1, 9, 9);
	context.fillStyle = colors[0];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const index = randomIntFromInterval(0, colors.length);
			context.fillStyle = colors[index];
			context.fillRect(i, j, 1, 1);
		}
	}
}
export function imgURI(letter: string) {
	// const letters = '0123456789ABCDEF';
	// let color = '#';
	// for (let i = 0; i < 6; i++) {
	// 	color += letters[Math.floor(Math.random() * 16)];
	// }
	const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(letter))
	return url
}