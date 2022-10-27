import process from 'process'; // eslint-disable-line node/prefer-global/process

export default function hasFlag(flag: String, argv: String = process.argv): Boolean {
	const prefix: String = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position: Number = argv.indexOf(prefix + flag);
	const terminatorPosition: Number = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
