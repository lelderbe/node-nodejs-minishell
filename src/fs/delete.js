import { rm } from 'fs/promises';

export const remove = async (filename) => {
	return rm(filename, { recursive: true });
};
