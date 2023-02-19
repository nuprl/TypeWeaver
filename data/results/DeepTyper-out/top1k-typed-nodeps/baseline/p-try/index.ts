export default async function pTry(function_, ...arguments_) {
	return new Promise((resolve: void) => {
		resolve(function_(...arguments_));
	});
}
