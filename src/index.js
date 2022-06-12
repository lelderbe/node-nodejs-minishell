import readline from 'node:readline';
import {
	APP_NAME,
	CMD_EXIT,
	PWD_TEXT,
	ERR_INVALID_INPUT,
	ERR_INVALID_ARGUMENTS,
	ERR_OPERATION_FAILED,
	RESET,
} from './constants.js';
import { state } from './init.js';
import * as commands from './commands/index.js';

const cli = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: state.colors.cli + `${APP_NAME}> ` + RESET,
});

// console.log('state:', state);
console.log(
	state.colors.cli + `Welcome to the File Manager, ${state.username}!`,
	RESET,
);
console.log(PWD_TEXT, state.pwd);

console.log(commands);

cli.prompt();

cli.on('line', async (line) => {
	const [cmd, ...args] = line.trim().split(' ');

	if (cmd === CMD_EXIT) {
		cli.close();
		return;
	}

	if (cmd === '') {
		cli.prompt();
		return;
	}

	if (cmd in commands) {
		try {
			await commands[cmd](args);
		} catch (err) {
			switch (err.message) {
				case ERR_INVALID_INPUT:
				case ERR_INVALID_ARGUMENTS:
				case ERR_OPERATION_FAILED:
					console.log(state.colors.err + err.message, RESET);
					break;
				default:
					console.log(state.colors.err + ERR_OPERATION_FAILED, RESET);
					break;
			}
		}
	} else {
		console.log(state.colors.err + ERR_INVALID_INPUT, RESET);
	}

	console.log(PWD_TEXT, state.pwd);
	cli.prompt();
});

cli.on('close', () => {
	console.log(
		state.colors.cli +
			`Thank you for using File Manager, ${state.username}!`,
		RESET,
	);
	process.exit(0);
});

cli.on('SIGINT', () => {
	console.log();
	cli.close();
});
