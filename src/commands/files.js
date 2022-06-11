import path from 'path';
import { stat } from 'fs/promises';
import { create } from '../fs/create.js';
import { read } from '../streams/read.js';
import { rename } from '../fs/rename.js';
import { copy } from '../streams/copy.js';
import { remove } from '../fs/delete.js';
import { ERR_INVALID_ARGUMENTS } from '../constants.js';
import { makePath } from '../utils/fs.js';

export const add = async ([src, ...rest]) => {
	if (!src || path.dirname(src) !== '.' || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);

	await create(srcPath);
};

export const cat = async ([src, ...rest]) => {
	if (!src || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);

	await read(srcPath);
};

export const cp = async ([src, dst, ...rest]) => {
	if (!src || !dst || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(path.join(dst, path.basename(src)));

	if (!(await stat(srcPath)).isFile()) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	await copy(srcPath, dstPath);
};

export const mv = async ([src, dst, ...rest]) => {
	await cp([src, dst, ...rest]);
	await rm([src, ...rest]);
};

export const rm = async ([src, ...rest]) => {
	if (!src || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);

	await remove(srcPath);
};

export const rn = async ([src, dst, ...rest]) => {
	if (!src || !dst || path.normalize(dst).includes(path.sep) || rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(path.join(path.dirname(src), dst));

	await rename(srcPath, dstPath);
};
