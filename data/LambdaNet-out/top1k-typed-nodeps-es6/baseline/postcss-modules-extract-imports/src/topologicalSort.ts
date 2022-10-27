const PERMANENT_MARKER: Number = 2;
const TEMPORARY_MARKER: Number = 1;

function createError(node: Function, graph: Object): Object {
  const er: Error = new Error("Nondeterministic import's order");

  const related: Array = graph[node];
  const relatedNode: Object = related.find(
    (relatedNode: Object) => graph[relatedNode].indexOf(node) > -1
  );

  er.nodes = [node, relatedNode];

  return er;
}

function walkGraph(node: Object, graph: Object, state: Object, result: Array, strict: String): String {
  if (state[node] === PERMANENT_MARKER) {
    return;
  }

  if (state[node] === TEMPORARY_MARKER) {
    if (strict) {
      return createError(node, graph);
    }

    return;
  }

  state[node] = TEMPORARY_MARKER;

  const children: Array = graph[node];
  const length: Number = children.length;

  for (let i = 0; i < length; ++i) {
    const error: Error = walkGraph(children[i], graph, state, result, strict);

    if (error instanceof Error) {
      return error;
    }
  }

  state[node] = PERMANENT_MARKER;

  result.push(node);
}

function topologicalSort(graph: String, strict: String): Array {
  const result: Array = [];
  const state: Function = {};

  const nodes: Array = Object.keys(graph);
  const length: Number = nodes.length;

  for (let i = 0; i < length; ++i) {
    const er: String = walkGraph(nodes[i], graph, state, result, strict);

    if (er instanceof Error) {
      return er;
    }
  }

  return result;
}

export default topologicalSort;
