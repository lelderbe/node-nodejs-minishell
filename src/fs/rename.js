import fs from 'fs/promises';

export const rename = async (src, dst) => {
	return fs.rename(src, dst);
};
