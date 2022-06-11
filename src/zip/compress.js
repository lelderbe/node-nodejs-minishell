import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { BrotliCompress } from 'zlib';

export const compressFile = async (src, dst) => {
	let source;
	let destination;

	try {
		source = await open(src, 'r');
		destination = await open(dst, 'w');

		const readStream = source.createReadStream();
		const writeStream = destination.createWriteStream();
		const zip = BrotliCompress();

		await pipeline(readStream, zip, writeStream);
	} finally {
		await source?.close();
		await destination?.close();
	}
};
