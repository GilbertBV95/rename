export const getArgs = (args) => {
	const pathIndex = args.findIndex(arg => arg === '--path');
	const path = pathIndex != -1 && args[pathIndex + 1] ? args[pathIndex + 1] : undefined;

	const helpIndex = args.findIndex(arg => arg === '--help' || arg === '-h');
	const help = helpIndex !== -1 ? true : false;

	const extIndex = args.findIndex(arg => arg === '--ext');
	const ext = extIndex !== -1 && args[extIndex + 1] ? args[extIndex + 1].split(' ') : undefined;

	const renameDirIndex = args.findIndex(arg => arg === '---rndir');
	const renameDir = renameDirIndex !== -1 ? true : false;

	const modelIndex = args.findIndex(arg => arg === '---model' || arg === '-m');
	const model = modelIndex !== -1 && args[modelIndex + 1] ? args[modelIndex + 1] : 'gemini-2.5-flash';

	const regexIndex = args.findIndex(arg => arg === '--regex');
	const regex = regexIndex !== -1 && args[regexIndex + 1] ? args[regexIndex + 1] : undefined;

	return { path, help, ext, renameDir, model, regex }
}