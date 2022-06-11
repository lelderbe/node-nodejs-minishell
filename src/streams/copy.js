import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';

export const copy = async (src, dst) => {
	let source;
	let destination;

	try {
		source = await open(src, 'r');
		destination = await open(dst, 'w');

		const readStream = source.createReadStream();
		const writeStream = destination.createWriteStream();

		await pipeline(readStream, writeStream);
	} finally {
		await source?.close();
		await destination?.close();
	}
};
