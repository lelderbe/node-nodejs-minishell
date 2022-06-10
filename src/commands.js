import { list } from './fs/list.js';
import { create } from './fs/create.js';
// import { read } from './streams/read.js';
import { read } from './fs/read.js';
import { rename } from './fs/rename.js';
import { copy } from './fs/copy.js';
import { remove } from './fs/delete.js';
import path from 'path';
import { chdir } from 'process';
import { state } from './init.js';
import { BLUE, ERR_INVALID_ARGUMENTS, RESET } from './constants.js';
import { EOL, cpus, userInfo, arch } from 'os';

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

const _ = async () => {
	try {
		// await list(path);
	} catch {
		console.log('Operation failed');
	}
};

export const add = async ([target, ...rest]) => {
	if (!target || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	// const dest = makePath(target);
	const dest = makePath(path.basename(target));

	await create(dest);
};

export const os = async ([arg, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	switch (arg) {
		case '--EOL':
			console.log(JSON.stringify(EOL));
			break;
		case '--cpus':
			console.log(cpus());
			break;
		case '--homedir':
			console.log(userInfo().homedir);
			break;
		case '--username':
			console.log(userInfo().username);
			break;
		case '--architecture':
			console.log(arch());
			break;
		default:
			throw new Error(ERR_INVALID_ARGUMENTS);
	}
};

export const rn = async ([src, dst, ...rest]) => {
	if (!src || !dst) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	await rename(srcPath, dstPath);
};

export const mv = async ([src, dst, ...rest]) => {
	if (!src || !dst) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	await rn([src, path.join(dst, path.basename(src)), ...rest]);
};

export const rm = async ([target, ...rest]) => {
	if (!target) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const targetPath = makePath(target);

	await remove(targetPath);
};

export const cp = async ([src, dst, ...rest]) => {
	if (!src || !dst) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(path.join(dst, path.basename(src)));

	await copy(srcPath, dstPath);
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

export const help = async (cmd) => {
	console.log(`
Navigation & working directory (nwd):
 up - go upper from current directory
 cd path_to_directory - go to dedicated folder from current directory
 ls - list all files and folder in current directory and print it to console

Basic operations with files:
 add new_file_name - create empty file in current working directory
 cat path_to_file - read file and print it's content in console
 rn path_to_file new_filename - rename file
 cp path_to_file path_to_new_directory - copy file
 mv path_to_file path_to_new_directory - move file
 rm path_to_file - delete file

Operating system info:
 os --EOL - get default system End-Of-Line
 os --cpus - get host machine CPUs info
 os --homedir - get home directory
 os --username - get current system user name
 os --architecture - get CPU architecture for which Node.js binary has compiled

Hash calculation:
 hash path_to_file - calculate hash for file and print it into console

Compress and decompress operations:
 compress path_to_file path_to_destination - compress file (using Brotli algorytm)
 decompress path_to_file path_to_destination - decompress file (using Brotli algorytm)
`);
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
