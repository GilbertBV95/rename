import { printError } from "./print.js";
import { exit } from 'node:process';

export const matchRegExp = (regex = undefined) => {
	const avaliableFlags = ['g', 'i', 'm', 'u', 'y', 's', 'd'];
	if (!regex) return regex

	if (regex instanceof RegExp) return regex;

	const lastIndex = regex.lastIndexOf('/');

	if (typeof regex == 'string' && regex.startsWith('/') && lastIndex > 0) {
		const lastSlash = regex.lastIndexOf('/');
		const pattern = regex.slice(1, lastSlash);
		const flags = regex.slice(lastSlash + 1);
		const validFlags = avaliableFlags.filter(f => flags.includes(f)).join('');

		return new RegExp(pattern, validFlags);
	} else if (regex.startsWith('/') && lastIndex == 0) {
		printError('Expresión regular no válida');
		exit(1);

	}
	return new RegExp(regex);
}