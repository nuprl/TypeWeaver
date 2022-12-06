import process from 'process'; // eslint-disable-line node/prefer-global/process

export default function hasFlag(flag: string, argv: string = process.argv): boolean {
	const prefix: string = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position: number = argv.indexOf(prefix + flag);
	const terminatorPosition: number = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
