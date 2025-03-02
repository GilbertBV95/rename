import { lstatSync, readdirSync, renameSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { exit, openStdin } from 'node:process';

const regex = /[.|\-|_|(|)|\[|\]]|\+/g

const main = () => {
	printEndLine('Enter the files path :')
	openStdin().addListener('data', (data) => {
		const str = data.toString().trim();
		if (str) {
			const path = dirname(str + '\\\r\n');
			rename(path);
		} else printError('Error: Invalid file path');
		exit();
	})
};

function printEndLine(msg) {
	console.log(`${msg} \n`);
}

function printError(msg) {
	console.log(`\x1b[31m${msg}\x1b[0m`)
}

function rename(path) {
	try {
		const cola = [path];
		let totalFiles = 0, renamedFiles = 0;

		while (cola.length > 0) {
			const currentPath = cola.shift();

			const dirContent = readdirSync(currentPath);

			if (currentPath === path)
				printEndLine(`\n\x1b[33m Initial Path ${currentPath}\x1b[0m`)
			else
				console.log(`\x1b[36m Current Path ${currentPath}\x1b[0m`)

			for (let i = 0; i < dirContent.length; i++) {
				const element = dirContent[i];
				const elementPath = join(currentPath, element);

				const stats = lstatSync(elementPath);

				//si es fichero o link simbolico
				if (stats.isFile() || stats.isSymbolicLink()) {
					totalFiles++;
					const ext = extname(element);
					const elementBaseName = basename(element, ext);

					//si el nombre del fichero contiene algun caracter especial
					if (elementBaseName.match(regex)) {
						//quitando caracteres especiales
						let newElementName = `${elementBaseName.replace(regex, ' ').trim()}${ext}`;
						//quitando espacios en blanco repetidos
						newElementName = newElementName.replace(/\s+/g, ' ');
						renameSync(elementPath, `${dirname(elementPath)}\\${newElementName}`);
						console.log(`\x1b[31m Renaming ${element}\x1b[0m to \x1b[32m${newElementName}\x1b[0m`);
						renamedFiles++;
					}
				} else if (stats.isDirectory) {
					cola.push(elementPath);
				}
			}
		}

		console.log('')
		console.log(` Files Found: ${totalFiles}, Renamed Files ${renamedFiles}`);
	} catch (error) {
		printError('Error: ' + error.message);
	}
}

main();