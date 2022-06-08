import { readdir } from 'fs/promises';

export const list = async (path) => {
	try {
		const files = await readdir(path);
		for (const file of files) {
			console.log(file);
		}
	} catch (err) {
		throw err;
	}
};
