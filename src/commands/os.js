import { ERR_INVALID_ARGUMENTS } from '../constants.js';
import { EOL, cpus, userInfo, arch } from 'os';

export const os = async ([arg, ...rest]) => {
	if (rest.length) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	switch (arg) {
		case '--EOL':
			console.log(JSON.stringify(EOL));
			break;
		case '--cpus':
			console.log(cpus());
			break;
		case '--homedir':
			console.log(userInfo().homedir);
			break;
		case '--username':
			console.log(userInfo().username);
			break;
		case '--architecture':
			console.log(arch());
			break;
		default:
			throw new Error(ERR_INVALID_ARGUMENTS);
	}
};
