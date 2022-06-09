import fs from 'fs/promises';

export const copy = async (src, dst) => {
	return fs.copyFile(src, dst);
};
