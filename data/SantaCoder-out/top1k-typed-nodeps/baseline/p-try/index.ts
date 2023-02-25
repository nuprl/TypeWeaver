export default async function pTry(function_: any, ...arguments_: any[]) {
	return new Promise(resolve => {
		resolve(function_(...arguments_));
	});
}