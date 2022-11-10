export default function isInteractive({stream = process.stdout} = {}: Interactive) {
	return Boolean(
		stream && stream.isTTY &&
		process.env.TERM !== 'dumb' &&
		!('CI' in process.env)
	);
}