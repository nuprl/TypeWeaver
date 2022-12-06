export default function pathKey(options: object = {}): string {
	const {
		env = process.env,
		platform = process.platform
	} = options;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(env).reverse().find((key: string) => key.toUpperCase() === 'PATH') || 'Path';
}
