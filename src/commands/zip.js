import { ERR_INVALID_INPUT, ERR_OPERATION_FAILED } from '../constants.js';
import { makePath } from '../utils/fs.js';
import { compressFile } from '../zip/compress.js';
import { decompressFile } from '../zip/decompress.js';

export const compress = async ([src, dst, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	if (srcPath === dstPath) {
		throw new Error(ERR_OPERATION_FAILED);
	}

	await compressFile(srcPath, dstPath);
};

export const decompress = async ([src, dst, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	const srcPath = makePath(src);
	const dstPath = makePath(dst);

	if (srcPath === dstPath) {
		throw new Error(ERR_OPERATION_FAILED);
	}

	await decompressFile(srcPath, dstPath);
};
