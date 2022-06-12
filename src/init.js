import os from 'os';
import { chdir } from 'process';
import { parseArgs } from './cli/args.js';
import { BLUE, MINGW, RED } from './constants.js';

export const state = {
	colors: {},
};

const args = parseArgs();

state.username = args.username;
state.colors.disable = args.colors === 'disable' ? true : false;

state.colors.cli = '';
state.colors.err = '';

if (!state.colors.disable) {
	state.colors.cli = BLUE;
	state.colors.err = RED;

	if (Object.keys(process.env).some((item) => item.startsWith('MINGW'))) {
		state.colors.cli = MINGW;
	}
}

if (!state.username) {
	console.log('Error: wrong arguments. Use key: --username=your_name');
	process.exit(1);
}

state.home = os.homedir();
state.pwd = os.homedir();

try {
	chdir(state.pwd);
} catch (err) {
	console.error(`Fatal error: ${err}`);
	process.exit(1);
}
