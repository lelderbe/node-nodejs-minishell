import { list } from './fs/list.js';
import { create } from './fs/create.js';
// import { read } from './streams/read.js';
import { read } from './fs/read.js';
import path from 'path';
import { chdir } from 'process';
import { state } from './init.js';

export const available = ['.exit', 'add', 'cat', 'cd', 'ls', 'pwd', 'up'];

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

export const add = async ([target, ...rest]) => {
	if (!target) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const dest = makePath(target);

	await create(dest);
};

export const cat = async ([target, ...rest]) => {
	if (!target) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const dest = makePath(target);

	await read(dest);
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
