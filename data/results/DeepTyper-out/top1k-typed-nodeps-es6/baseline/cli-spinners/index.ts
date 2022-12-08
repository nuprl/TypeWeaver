'use strict';

const spinners: any = Object.assign({}, require('./spinners.json')); // eslint-disable-line import/extensions

const spinnersList: string[] = Object.keys(spinners);

Object.defineProperty(spinners, 'random', {
	get() {
		const randomIndex: number = Math.floor(Math.random() * spinnersList.length);
		const spinnerName: string = spinnersList[randomIndex];
		return spinners[spinnerName];
	}
});

export default spinners;
