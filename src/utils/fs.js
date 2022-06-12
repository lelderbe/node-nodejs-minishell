import path from 'path';
import { state } from '../init.js';

export const makePath = (target) => {
	if (!target) {
		return null;
	}

	let dest;
	if (path.isAbsolute(target)) {
		dest = target;
	} else {
		dest = path.join(state.pwd, target);
	}

	return dest;
};
