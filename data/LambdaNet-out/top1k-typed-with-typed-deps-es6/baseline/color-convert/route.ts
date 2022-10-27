import conversions from './conversions';

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph(): Object {
	const graph: Object = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models: Array = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel: String): Object {
	const graph: Object = buildGraph();
	const queue: Array = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current: String = queue.pop();
		const adjacents: Array = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent: String = adjacents[i];
			const node: Object = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from: Function, to: Function): Function {
	return function (args: Array) {
		return to(from(args));
	};
}

function wrapConversion(toModel: String, graph: Object): String {
	const path: Array = [graph[toModel].parent, toModel];
	let fn: String = conversions[graph[toModel].parent][toModel];

	let cur: String = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

export default function (fromModel: String) {
	const graph: Object = deriveBFS(fromModel);
	const conversion: Object = {};

	const models: Array = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel: String = models[i];
		const node: Object = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

