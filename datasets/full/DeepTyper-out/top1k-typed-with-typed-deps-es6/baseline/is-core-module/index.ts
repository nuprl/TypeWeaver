'use strict';

import has from 'has';

function specifierIncluded(current: string, specifier: string): string {
	var nodeParts: string[] = current.split('.');
	var parts: string[] = specifier.split(' ');
	var op: string = parts.length > 1 ? parts[0] : '=';
	var versionParts: string = (parts.length > 1 ? parts[1] : parts[0]).split('.');

	for (var i = 0; i < 3; ++i) {
		var cur: number = parseInt(nodeParts[i] || 0, 10);
		var ver: number = parseInt(versionParts[i] || 0, 10);
		if (cur === ver) {
			continue; // eslint-disable-line no-restricted-syntax, no-continue
		}
		if (op === '<') {
			return cur < ver;
		}
		if (op === '>=') {
			return cur >= ver;
		}
		return false;
	}
	return op === '>=';
}

function matchesRange(current: string, range: string): boolean {
	var specifiers: string[] = range.split(/ ?&& ?/);
	if (specifiers.length === 0) {
		return false;
	}
	for (var i = 0; i < specifiers.length; ++i) {
		if (!specifierIncluded(current, specifiers[i])) {
			return false;
		}
	}
	return true;
}

function versionIncluded(nodeVersion: string, specifierValue: any): boolean {
	if (typeof specifierValue === 'boolean') {
		return specifierValue;
	}

	var current: any = typeof nodeVersion === 'undefined'
		? process.versions && process.versions.node
		: nodeVersion;

	if (typeof current !== 'string') {
		throw new TypeError(typeof nodeVersion === 'undefined' ? 'Unable to determine current node version' : 'If provided, a valid node version is required');
	}

	if (specifierValue && typeof specifierValue === 'object') {
		for (var i = 0; i < specifierValue.length; ++i) {
			if (matchesRange(current, specifierValue[i])) {
				return true;
			}
		}
		return false;
	}
	return matchesRange(current, specifierValue);
}

import data from './core.json';

export default function isCore(x: any, nodeVersion: string): boolean {
	return has(data, x) && versionIncluded(nodeVersion, data[x]);
};
