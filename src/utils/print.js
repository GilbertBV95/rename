const colorEnum = {
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	blue: '\x1b[36m',
	default: '\x1b[0m'
}

export function printEndLine(msg, color = 'default', endLine = true) {
	if (endLine)
		console.log(`${colorEnum[color]} ${msg} ${colorEnum.default} \n`);
	else
		console.log(`${colorEnum[color]} ${msg} ${colorEnum.default}`);
}

export function printError(msg) {
	console.log(`${colorEnum.red} Error: ${msg} ${colorEnum.default}`)
}

export function printWithDiferentColor(msg1, msg2, color1, color2, separator = 'a') {
	console.log(`${colorEnum[color1]} ${msg1}${colorEnum.default} ${separator} ${colorEnum[color2]} ${msg2} ${colorEnum.default}`)
}