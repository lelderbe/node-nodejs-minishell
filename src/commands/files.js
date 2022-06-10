import { create } from '../fs/create.js';
// import { read } from '../streams/read.js';
import { read } from '../fs/read.js';
import { rename } from '../fs/rename.js';
import { copy } from '../fs/copy.js';
import { remove } from '../fs/delete.js';
import path from 'path';
import { ERR_INVALID_ARGUMENTS } from '../constants.js';
import { makePath } from '../utils/fs.js';

export const add = async ([target, ...rest]) => {
	if (!target || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	// const dest = makePath(target);
	const dest = makePath(path.basename(target));

	await create(dest);
};

export const cat = async ([target, ...rest]) => {
	if (!target) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const dest = makePath(target);

	await read(dest);
};

export const cp = async ([src, dst, ...rest]) => {
	if (!src || !dst) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(path.join(dst, path.basename(src)));

	await copy(srcPath, dstPath);
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

export const rn = async ([src, dst, ...rest]) => {
	if (!src || !dst) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	await rename(srcPath, dstPath);
};
