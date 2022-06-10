import { parseArgs } from './cli/args.js';
import os from 'os';
import { chdir } from 'process';

export const state = {};

// console.log('init');

state.username = parseArgs().username;

if (!state.username) {
	console.log('Error: wrong arguments. Use: --username=your_name');
	process.exit(0);
}

state.home = os.homedir();
state.pwd = os.homedir();

try {
	chdir(state.pwd);
} catch (err) {
	console.error(`Fatal error: ${err}`);
	process.exit(0);
}
