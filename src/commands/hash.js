import { calculateHash } from '../hash/calcHash.js';
import { ERR_INVALID_INPUT } from '../constants.js';
import { makePath } from '../utils/fs.js';

export const hash = async ([src, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_INPUT);
	}

	const srcPath = makePath(src);

	console.log(await calculateHash(srcPath));
};
