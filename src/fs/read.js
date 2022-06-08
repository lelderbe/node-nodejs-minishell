import { readFile } from 'fs/promises';

export const read = async (filename) => {
	const data = await readFile(filename, { encoding: 'utf8' });
	console.log(data);
};
