import { configDotenv } from 'dotenv';
import { exit, argv } from 'node:process';
import { printError } from './utils/print.js';
import { scanDirAndRename } from './utils/filename_sanitizer.js';
import { getArgs } from './utils/get_args.js';
import { getFileRenameSuggestionFromIA } from './services/gemini_api.js';
import { matchRegExp } from './utils/validate_regex.js';

configDotenv();

//TODO TERMINAR LA CONEXION CON EL LLM Y VER LO DE REORGANIZAR FICHEROS POR AFINIDAD
export const main = async () => {
	const args = argv.slice(2);
	const { path, help, ext, renameDir, model, regex } = getArgs(args);

	if (help) {
		showHelp();
		exit();
	}

	if (!path) {
		printError('Introduzca un directorio');
		exit(1);
	}

	const data = await scanDirAndRename(path, matchRegExp(regex), ext);

	// await getFileRenameSuggestionFromIA(model, renameSubPrompt(data));

	// printEndLine('Enter the files path :')
	// openStdin().addListener('data', (data) => {
	// 	const str = data.toString().trim();
	// 	const path = dirname(str + '\\\r\n');
	// 	const a = scanDirAndRename(path);
	// 	console.log(a, 'aa');
	// 	exit();
	// })

};

const showHelp = () => {
	console.log(`
	Uso:	rename --path D:\\Pelis [opciones]
		rename --path D:\\Series --regex '/\s/g'

	Opciones:
	-rndir			Para renombrar las carpetas
	--ext			Extension de los ficheros a renombrar (Todas por defecto)
	-h, --help		Muestra esta pantalla de ayuda
	-m, --model		Modelo a utilizar (Por defecto: gemini-2.5-flash)
	--path			Directorio inicial para renombrar contenido
	--regex			Expresion regular con los caracteres a eliminar 
				-ej: '/\s/g'
				-Elimina por defecto ., -,_ ,( ,) ,[ ,]

	Ejemplos:
	rename --path D:\\Documentos --ext pdf,doc	Renombra los pdf y doc
	rename --path D:\\Documentos -d		Renombra todos los ficheros y carpetas
	`)
}

const renameSubPrompt = (data) => `
Eres un cinefilo al que le gustan las peliculas en ingles con subtitulos en espanhol,
y tienes un directorio de videos con sus respectivos subtitulos pero no siempre coniciden
con el mismo nombre, lo que necesito es que me sugieras cuales subtitulos (archivos.str) debo
cambiar el nombre y cual nombre poner por ejemplo:
Tengo la carpeta peliculas con los siguientes archivos
-Liberen a Willy.mp4	-Ghost Hunters.avi	-Willy.srt -Gh0st Hunter.srt
los subtiltulos deberian ser renombrados de Willy.srt a Liberen a Willy.srt y Gh0st Hunter.srt a
Ghost Hunters.avi

Debes hacer los siguinte:
1.Debes renombrar cada subtitulo de manera que coincida con el video
2.Empareja por orden si no hay coincidencia directa

Este es el listado de los ficheros
---
${data}
---
Responde SOLAMENTE con la solucion, no incluyas explicaciones adicionales y dame solo la lista de los renombramientos en formato JSON con la siguiente estructura ej: [{old_name: Willy, new_name: Liberen a Willy, ext: srt, path: D:\\peliculas\\}].
`;