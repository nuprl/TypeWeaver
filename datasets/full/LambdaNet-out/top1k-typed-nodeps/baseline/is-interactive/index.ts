export default function isInteractive({stream = process.stdout} = {}): Promise {
	return Boolean(
		stream && stream.isTTY &&
		process.env.TERM !== 'dumb' &&
		!('CI' in process.env)
	);
}
