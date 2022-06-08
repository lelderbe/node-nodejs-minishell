import { parseArgs } from './cli/args.js';
import os from 'os';
import { chdir } from 'process';

export const state = {};

console.log('init');
state.args = parseArgs();
state.home = os.homedir();
state.pwd = os.homedir();
state.username = state.args?.username;

try {
	chdir(state.pwd);
} catch (err) {
	console.error(`Fatal error: ${err}`);
	process.exit(0);
}
