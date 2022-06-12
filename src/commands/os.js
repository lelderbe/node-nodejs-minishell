import { EOL, cpus, userInfo, arch } from 'os';
import { ERR_INVALID_ARGUMENTS } from '../constants.js';

const _cpus = () => {
	const result = cpus().map((item) => {
		while (item.speed > 10) {
			item.speed /= 10;
		}

		return { model: item.model, speed: item.speed };
	});

	result.unshift({ 'overall amount of CPUs': result.length });

	console.log(result);
};

const keys = {
	'--EOL': () => console.log(JSON.stringify(EOL)),
	'--cpus': _cpus,
	'--homedir': () => console.log(userInfo().homedir),
	'--username': () => console.log(userInfo().username),
	'--architecture': () => console.log(arch()),
};

const valid = (args) => {
	return args.every((item) => Object.keys(keys).includes(item));
};

export const os = async (args) => {
	if (!valid(args)) {
		throw new Error(ERR_INVALID_ARGUMENTS);
	}

	args.forEach((item) => keys[item]());
};
