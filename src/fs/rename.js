import fs from 'fs/promises';

export const rename = async (from, to) => {
	return fs.rename(from, to);
};
