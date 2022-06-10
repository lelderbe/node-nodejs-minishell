import { list } from '../fs/list.js';
import { chdir } from 'process';
import { state } from '../init.js';
import { makePath } from '../utils/fs.js';

export const cd = async ([target, ...rest]) => {
	// console.log('cd args:', target, rest);

	let dest;
	if (!target) {
		dest = state.home;
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
		dest = makePath(target);
	}

	await list(dest);
};

export const pwd = async () => {
	console.log(state.pwd);
};

export const up = async () => {
	await cd(['..']);
};
