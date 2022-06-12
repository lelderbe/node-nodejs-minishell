import { chdir } from 'process';
import { state } from '../init.js';
import { list } from '../fs/list.js';
import { makePath } from '../utils/fs.js';
import { ERR_INVALID_ARGUMENTS, ERR_INVALID_INPUT } from '../constants.js';

export const cd = async ([target, ...rest]) => {
	if (!target || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const dest = makePath(target);

	chdir(dest);
	state.pwd = dest;
};

export const ls = async ([target, ...rest]) => {
	if (target) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	await list(state.pwd);
};

export const pwd = async (rest) => {
	throw new Error(ERR_INVALID_INPUT);

	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	console.log(state.pwd);
};

export const up = async (args) => {
	if (args.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	await cd(['..']);
};
