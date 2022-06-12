import { EOL, cpus, userInfo, arch } from 'os';
import { ERR_INVALID_INPUT } from '../constants.js';

const _cpus = () => {
	const result = cpus().map((item) => {
		return { model: item.model, speed: item.speed / 1000 };
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
		throw new Error(ERR_INVALID_INPUT);
	}

	args.forEach((item) => keys[item]());
};
