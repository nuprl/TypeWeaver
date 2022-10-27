export default function pathKey(options: Object = {}): String {
	const {
		env = process.env,
		platform = process.platform
	} = options;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(env).reverse().find((key: String) => key.toUpperCase() === 'PATH') || 'Path';
}
