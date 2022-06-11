import { ERR_INVALID_ARGUMENTS } from '../constants.js';
import { makePath } from '../utils/fs.js';
import { compressFile } from '../zip/compress.js';
import { decompressFile } from '../zip/decompress.js';

export const compress = async ([src, dst, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	await compressFile(srcPath, dstPath);
};

export const decompress = async ([src, dst, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	await decompressFile(srcPath, dstPath);
};
