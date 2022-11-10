import process from 'process'; // eslint-disable-line node/prefer-global/process

export default function hasFlag(flag: number,  argv = process.argv: Array<string>) {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}