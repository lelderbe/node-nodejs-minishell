import readline from 'node:readline';
import {
	APP_NAME,
	CMD_EXIT,
	PWD_TEXT,
	ERR_INVALID_INPUT,
	ERR_INVALID_ARGUMENTS,
	ERR_OPERATION_FAILED,
	RED,
	BLUE,
	RESET,
} from './constants.js';
import { state } from './init.js';
import * as commands from './commands.js';

const cli = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: BLUE + `${APP_NAME}> ` + RESET,
});

// console.log('state:', state);
console.log(BLUE + `Welcome to the File Manager, ${state.username}!`, RESET);
console.log(PWD_TEXT, state.pwd);

// console.log(commands);

cli.prompt();

cli.on('line', async (line) => {
	const [cmd, ...args] = line.trim().split(' ');
	// console.log('Request for command:', cmd, 'with args:', args);

	if (cmd === CMD_EXIT) {
		cli.close();
		return;
	}

	if (cmd === '') {
		// TODO refactor
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
					console.log('\x1B[31mhello\x1B[34m world');
					console.log(RED + err.message, RESET);
					// console.log(err.message);
					break;
				default:
					console.log(err.message);
					console.log(ERR_OPERATION_FAILED);
					break;
			}
		}
	} else {
		console.log(RED + ERR_INVALID_INPUT, RESET);
		// console.log(ERR_INVALID_INPUT);
	}

	console.log(PWD_TEXT, state.pwd);
	cli.prompt();
});

cli.on('close', () => {
	console.log(
		BLUE + `Thank you for using File Manager, ${state.username}!`,
		RESET,
	);
	process.exit(0);
});

cli.on('SIGINT', () => {
	console.log();
	cli.close();
});
