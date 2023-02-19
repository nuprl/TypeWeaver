export default async function pTry(function_: Function, ...arguments_): Map {
	return new Promise((resolve: Function) => {
		resolve(function_(...arguments_));
	});
}
