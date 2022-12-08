export default function callsites(): any {
	const _prepareStackTrace: any = Error.prepareStackTrace;
	Error.prepareStackTrace = (_: any, stack: string) => stack;
	const stack: Error = new Error().stack.slice(1); // eslint-disable-line unicorn/error-message
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
}
