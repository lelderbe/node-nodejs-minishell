import { chdir } from 'process';
import { state } from '../init.js';
import { list } from '../fs/list.js';
import { makePath } from '../utils/fs.js';
import { ERR_INVALID_INPUT } from '../constants.js';

export const cd = async ([target, ...rest]) => {
	if (!target || rest.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	const dest = makePath(target);

	chdir(dest);
	state.pwd = dest;
};

export const ls = async ([target, ...rest]) => {
	if (target) {
		throw new Error(ERR_INVALID_INPUT);
	}

	await list(state.pwd);
};

const pwd = async (rest) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	console.log(state.pwd);
};

export const up = async (args) => {
	if (args.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	await cd(['..']);
};
