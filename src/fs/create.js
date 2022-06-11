import { writeFile } from 'fs/promises';

export const create = async (filename) => {
	return writeFile(filename, '', { flag: 'w' });
};
