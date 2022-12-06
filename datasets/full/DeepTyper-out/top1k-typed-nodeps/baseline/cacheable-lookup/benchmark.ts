'use strict';
const dns: any = require('dns');
const Benchmark: any = require('benchmark');
const CacheableLookup: any = require('.');

const cacheable: any = new CacheableLookup();
const suite: any = new Benchmark.Suite();

const options: any = {
	defer: true
};

const lookupOptions: any = {
	all: true
};

const lookupOptionsADDRCONFIG: any = {
	...lookupOptions,
	hints: dns.ADDRCONFIG
};

const query: any = 'example.com';

suite.add('CacheableLookup#lookupAsync', (deferred: any) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookupAsync.all', (deferred: any) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query, lookupOptions).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookupAsync.all.ADDRCONFIG', (deferred: any) => {
	// eslint-disable-next-line promise/prefer-await-to-then
	cacheable.lookupAsync(query, lookupOptionsADDRCONFIG).then(() => deferred.resolve());
}, options).add('CacheableLookup#lookup', (deferred: any) => {
	cacheable.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('CacheableLookup#lookup.all', (deferred: any) => {
	cacheable.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('CacheableLookup#lookup.all.ADDRCONFIG', (deferred: any) => {
	cacheable.lookup(query, lookupOptionsADDRCONFIG, () => deferred.resolve());
}, options).add('dns#lookup', (deferred: any) => {
	dns.lookup(query, () => deferred.resolve());
}, options).add('dns#lookup.all', (deferred: any) => {
	dns.lookup(query, lookupOptions, () => deferred.resolve());
}, options).add('dns#lookup.all.ADDRCONFIG', (deferred: any) => {
	dns.lookup(query, lookupOptionsADDRCONFIG, () => deferred.resolve());
}, options).on('cycle', (event: any) => {
	console.log(String(event.target));
}).on('complete', function () {
	console.log(`Fastest is ${this.filter('fastest').map('name')}`);
});

(async () => {
	await cacheable.lookupAsync(query);

	await new Promise((resolve: void) => setTimeout(resolve, 150));

	suite.run();
})();
