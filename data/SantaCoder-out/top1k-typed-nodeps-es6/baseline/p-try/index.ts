export default async function pTry(function_: function_, ...arguments_: any[]) {
	return new Promise(resolve => {
		resolve(function_(...arguments_));
	});
}