import fs from 'fs/promises';
import { pipeline } from 'stream/promises';

export const read = async (filename) => {
	const fd = await fs.open(filename);
	const inputStream = fd.createReadStream({ encoding: 'utf-8' });
	await pipeline(inputStream, process.stdout);
	console.log('pipeline done');
	// inputStream.pipe(process.stdout);
};
