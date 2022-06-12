import os from 'os';
import { chdir } from 'process';
import { parseArgs } from './cli/args.js';
import { BLUE, RED } from './constants.js';

export const state = {
	colors: {},
};

state.colors.cli = BLUE;
state.colors.err = RED;

state.username = parseArgs().username;

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
