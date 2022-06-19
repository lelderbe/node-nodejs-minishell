import { readdir } from 'fs/promises';

export const list = async (path) => {
	const files = await readdir(path);
	for (const file of files) {
		console.log(file);
	}
};
