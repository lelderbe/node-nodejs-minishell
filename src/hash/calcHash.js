import { createReadStream } from 'fs';
const { createHash } = await import('crypto');

export const calculateHash = async (filename) => {
	return new Promise((resolve, reject) => {
		const hash = createHash('sha256').setEncoding('hex');
		const stream = createReadStream(filename);
		stream.on('error', (err) => reject(err));
		stream.on('data', (chunk) => hash.update(chunk));
		stream.on('end', () => resolve(hash.digest('hex')));
	});
};
