export const endianness: string = function () { return 'LE' };

export const hostname: string = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

export const loadavg: any[] = function () { return [] };
export const uptime: number = function () { return 0 };

export const freemem: number = function () {
    return Number.MAX_VALUE;
};

export const totalmem: number = function () {
    return Number.MAX_VALUE;
};

export const cpus: any[] = function () { return [] };
export const type = function () { return 'Browser' };

export const release: any = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

export const networkInterfaces: any = exports.getNetworkInterfaces
= function () { return {} };

export const arch: string = function () { return 'javascript' };
export const platform: string = function () { return 'browser' };

export const tmpdir: any = exports.tmpDir = function () {
    return '/tmp';
};

export const EOL: string = '\n';

export const homedir: string = function () {
	return '/'
};
