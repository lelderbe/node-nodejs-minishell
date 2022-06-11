import { chdir } from 'process';
import { state } from '../init.js';
import { list } from '../fs/list.js';
import { makePath } from '../utils/fs.js';
import { ERR_INVALID_ARGUMENTS, ERR_INVALID_INPUT } from '../constants.js';

export const cd = async ([target, ...rest]) => {
	// console.log('cd args:', target, rest);
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	let dest;
	if (!target) {
		if (state.advanced) {
			dest = state.home;
		} else {
			throw new Error(ERR_INVALID_ARGUMENTS);
		}
	} else {
		dest = makePath(target);
	}

	// console.log('got new path:', dest);
	chdir(dest);
	// console.log('directory changed');
	state.pwd = dest;
	return;
};

export const ls = async ([target, ...rest]) => {
	let dest;
	if (!target) {
		dest = state.pwd;
	} else {
		if (state.advanced) {
			dest = makePath(target);
		} else {
			throw new Error(ERR_INVALID_ARGUMENTS);
		}
	}

	await list(dest);
};

export const pwd = async (rest) => {
	if (!state.advanced) {
		throw new Error(ERR_INVALID_INPUT);
	}

	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	console.log(state.pwd);
};

export const up = async (rest) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	await cd(['..']);
};
