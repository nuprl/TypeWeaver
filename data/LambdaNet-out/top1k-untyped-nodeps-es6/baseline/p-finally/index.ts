export default async function pFinally(
	promise: Promise,
	onFinally: Array = (() => {})
): HTMLElement {
	let value: Function;
	try {
		value = await promise;
	} catch (error) {
		await onFinally();
		throw error;
	}

	await onFinally();
	return value;
}
