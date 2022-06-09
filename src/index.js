import readline from 'node:readline';
import {
	APP_NAME,
	CMD_EXIT,
	PWD_TEXT,
	ERR_INVALID_INPUT,
	ERR_OPERATION_FAILED,
} from './constants.js';
import { state } from './init.js';
import * as commands from './commands.js';

const cli = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `${APP_NAME}> `,
});

console.log('state:', state);
console.log(`Welcome to the File Manager, ${state.username}!`);
console.log(PWD_TEXT, state.pwd);

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

	if (commands.available.includes(cmd)) {
		// TODO replace eval with something more safe?
		try {
			await eval(`commands.${cmd}`)(args);
		} catch (err) {
			console.log(err);
			console.log(ERR_OPERATION_FAILED);
		}
	} else {
		console.log(ERR_INVALID_INPUT);
	}

	// console.log(PWD_TEXT, state.pwd);
	cli.prompt();
});

cli.on('close', () => {
	console.log(`Thank you for using File Manager, ${state.username}!`);
	process.exit(0);
});

cli.on('SIGINT', () => {
	console.log();
	cli.close();
});
