import { open } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { BrotliDecompress } from 'zlib';

export const decompressFile = async (src, dst) => {
	let source;
	let destination;

	try {
		source = await open(src, 'r');
		destination = await open(dst, 'w');

		const readStream = source.createReadStream();
		const writeStream = destination.createWriteStream();
		const gunzip = BrotliDecompress();

		await pipeline(readStream, gunzip, writeStream);
	} finally {
		await source?.close();
		await destination?.close();
	}
};
