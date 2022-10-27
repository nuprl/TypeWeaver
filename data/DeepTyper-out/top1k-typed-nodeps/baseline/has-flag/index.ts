import process from 'process'; // eslint-disable-line node/prefer-global/process

export default function hasFlag(flag, argv = process.argv) {
	const prefix: string = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position: number = argv.indexOf(prefix + flag);
	const terminatorPosition: boolean = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
