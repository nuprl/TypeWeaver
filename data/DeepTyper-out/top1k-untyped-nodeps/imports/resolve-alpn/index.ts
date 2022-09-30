'use strict';
import tls from 'tls';

module.exports = (options = {}, connect = tls.connect) => new Promise((resolve: void, reject: void) => {
	let timeout: number = false;

	let socket: any;

	const callback: Promise<void> = async () => {
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

	const onTimeout: Promise<void> = async () => {
		timeout = true;
		callback();
	};

	const socketPromise: Promise<void> = (async () => {
		try {
			socket = await connect(options, callback);

			socket.on('error', reject);
			socket.once('timeout', onTimeout);
		} catch (error) {
			reject(error);
		}
	})();
});
