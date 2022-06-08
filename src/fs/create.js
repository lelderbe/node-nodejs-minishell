import { writeFile } from 'fs/promises';

export const create = async (filename) => {
	await writeFile(filename, '', { flag: 'wx' });
};
