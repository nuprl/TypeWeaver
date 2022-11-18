'use strict';
const tls: string = require('tls');

module.exports = (options: object = {}, connect: Function = tls.connect) => new Promise((resolve: Function, reject: string) => {
	let timeout: boolean = false;

	let socket: object;

	const callback: Function = async () => {
		await socketPromise;

		socket.off('timeout', onTimeout);
		socket.off('error', reject);

		if (options.resolveSocket) {
			resolve({alpnProtocol: socket.alpnProtocol, socket, timeout});

			if (timeout) {
				await Promise.resolve();
				socket.emit('timeout');
			}
		} else {
			socket.destroy();
			resolve({alpnProtocol: socket.alpnProtocol, timeout});
		}
	};

	const onTimeout: Function = async () => {
		timeout = true;
		callback();
	};

	const socketPromise: object = (async () => {
		try {
			socket = await connect(options, callback);

			socket.on('error', reject);
			socket.once('timeout', onTimeout);
		} catch (error) {
			reject(error);
		}
	})();
});
