import path from 'path';
import { state } from '../init.js';

export const makePath = (target) => {
	// console.log('makePath target:', target);

	if (!target) {
		return null;
	}

	let dest;
	if (path.isAbsolute(target)) {
		dest = target;
	} else {
		dest = path.join(state.pwd, target);
	}

	// console.log('made new path:', dest);

	return dest;
};
