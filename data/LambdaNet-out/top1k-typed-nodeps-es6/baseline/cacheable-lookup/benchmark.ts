'use strict';
import dns from 'dns';
import Benchmark from 'benchmark';
import CacheableLookup from '.';

const cacheable: HTMLElement = new CacheableLookup();
const suite: HTMLElement = new Benchmark.Suite();

const options: Object = {
	defer: true
};

const lookupOptions: Object = {
	all: true
};

const lookupOptionsADDRCONFIG: Object = {
	...lookupOptions,
	hints: dns.ADDRCONFIG
};

const query: String = 'example.com';

suite.add('CacheableLookup#lookupAsync', (deferred: Array) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookupAsync.all', (deferred: Array) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query, lookupOptions).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookupAsync.all.ADDRCONFIG', (deferred: Array) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query, lookupOptionsADDRCONFIG).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookup', (deferred: Array) => {
	cacheable.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('CacheableLookup#lookup.all', (deferred: Array) => {
	cacheable.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('CacheableLookup#lookup.all.ADDRCONFIG', (deferred: Array) => {
	cacheable.lookup(query, lookupOptionsADDRCONFIG, () => deferred.resolve());
}, options).add('dns#lookup', (deferred: Array) => {
	dns.lookup(query, () => deferred.resolve());
}, options).add('dns#lookup.all', (deferred: Array) => {
	dns.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('dns#lookup.all.ADDRCONFIG', (deferred: Array) => {
	dns.lookup(query, lookupOptionsADDRCONFIG, () => deferred.resolve());
}, options).on('cycle', (event: Object) => {
	console.log(String(event.target));
}).on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`);
});

(async () => {
	await cacheable.lookupAsync(query);

	await new Promise((resolve: Number) => setTimeout(resolve, 150));

	suite.run();
})();
