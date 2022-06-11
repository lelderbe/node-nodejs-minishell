import { calculateHash } from '../hash/calcHash.js';
import { ERR_INVALID_ARGUMENTS } from '../constants.js';
import { makePath } from '../utils/fs.js';

export const hash = async ([src, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	const srcPath = makePath(src);

	console.log(await calculateHash(srcPath));
};
