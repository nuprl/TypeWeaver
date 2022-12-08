var once: any = require('once');

var noop: void = function() {};

var isRequest: boolean = function(stream: any) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess: boolean = function(stream: any) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos: boolean = function(stream: any, opts: any, callback: any) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws: any = stream._writableState;
	var rs: any = stream._readableState;
	var readable: any = opts.readable || (opts.readable !== false && stream.readable);
	var writable: boolean = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled: boolean = false;

	var onlegacyfinish: void = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish: void = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend: void = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit: void = function(exitCode: number) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror: void = function(err: any) {
		callback.call(stream, err);
	};

	var onclose: void = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick: void = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest: void = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;
