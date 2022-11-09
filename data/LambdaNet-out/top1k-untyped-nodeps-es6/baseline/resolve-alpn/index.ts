'use strict';
import tls from 'tls';

export default (options: Object = {}, connect: Function = tls.connect) => new Promise((resolve: Function, reject: String) => {
	let timeout: Boolean = false;

	let socket: Object;

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

	const socketPromise: Object = (async () => {
		try {
			socket = await connect(options, callback);

			socket.on('error', reject);
			socket.once('timeout', onTimeout);
		} catch (error) {
			reject(error);
		}
	})();
});
