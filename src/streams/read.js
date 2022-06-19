import fs from 'fs';

export const read = async (filename) => {
	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(filename, 'utf8');
		stream.on('error', (err) => reject(err));
		stream.on('data', (chunk) => process.stdout.write(chunk));
		stream.on('end', () => resolve());
	});
};
