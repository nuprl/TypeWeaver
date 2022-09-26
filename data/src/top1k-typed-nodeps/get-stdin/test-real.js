import getStdin from './index.js';

(async () => {
	const stdin = await getStdin();
	process.exit(stdin ? 0 : 1); // eslint-disable-line unicorn/no-process-exit
})();
