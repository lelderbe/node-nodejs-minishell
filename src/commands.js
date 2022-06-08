import { list } from './fs/list.js';
import path from 'path';
import { chdir } from 'process';
import { state } from './init.js';

export const available = ['.exit', 'cd', 'ls', 'pwd', 'up'];

const makePath = (target) => {
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

export const _ = async () => {
	try {
		// await list(path);
	} catch {
		console.log('Operation failed');
	}
};

export const pwd = async () => {
	console.log(state.pwd);
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

export const up = async () => {
	await cd(['..']);
};

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
