import { lstat, readdir, rename } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { printEndLine, printError, printWithDiferentColor } from './print.js';
import { exit } from 'node:process';
import { promisify } from 'node:util';

export async function scanDirAndRename(path, regex = /[.\-_()\[\]+]/g, exts = []) {
	try {
		const cola = [path], fileTree = {};
		let totalFiles = 0, renamedFiles = 0;

		while (cola.length > 0) {
			const currentPath = cola.shift();

			const promisifiedReadDir = promisify(readdir)
			const dirContent = await promisifiedReadDir(currentPath);

			if (currentPath === path)
				printEndLine(`\n Directorio Inicial ${currentPath}`, 'yellow')
			else
				printEndLine(` Directorio Actual ${currentPath}`, 'blue', false);

			for (let i = 0; i < dirContent.length; i++) {
				const element = dirContent[i];
				const elementPath = join(currentPath, element);

				const promisifiedLstat = promisify(lstat);
				const stats = await promisifiedLstat(elementPath);

				//inicializando las dependencias de ficheros
				if (!fileTree[currentPath]) fileTree[currentPath] = [];

				//si es fichero o link simbolico
				if (stats.isFile() || stats.isSymbolicLink()) {
					const ext = extname(element);
					const elementBaseName = basename(element, ext);

					const inExt = exts.length ? exts.some(e => e == ext || `.${e}` == ext) : true;

					//si coincide con una de las extensiones permitidas
					if (inExt) {
						totalFiles++;
						//si el nombre del fichero contiene algun caracter especial
						if (elementBaseName.match(regex)) {
							//quitando caracteres especiales
							let newElementName = `${elementBaseName.replace(regex, ' ').trim()}${ext}`;
							//quitando espacios en blanco repetidos
							newElementName = newElementName.replace(/\s+/g, ' ');
							const newElementPath = `${dirname(elementPath)}\\${newElementName}`;
							const promisifiedRename = promisify(rename);
							await promisifiedRename(elementPath, newElementPath);
							printWithDiferentColor(`Renombrado ${element}`, `${newElementName}`, 'red', 'green');
							renamedFiles++;

							fileTree[currentPath].push(newElementPath);
						} else fileTree[currentPath].push(elementPath);
					}
				} else if (stats.isDirectory) {
					cola.push(elementPath);
				}
			}
		}

		console.log(`\n Ficheros Encontrados: ${totalFiles}, Ficheros Renombrados ${renamedFiles}`);

		return fileTree;
	} catch (error) {
		if (error.message.includes('ENOENT'))
			printError('Directorio o fichero no encontrado');
		else printError(error.message)
		exit(1);
	}
}