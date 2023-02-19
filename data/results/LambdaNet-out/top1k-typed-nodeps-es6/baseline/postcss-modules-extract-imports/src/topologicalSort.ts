const PERMANENT_MARKER: number = 2;
const TEMPORARY_MARKER: number = 1;

function createError(node: Function, graph: object): object {
  const er: Error = new Error("Nondeterministic import's order");

  const related: any[] = graph[node];
  const relatedNode: object = related.find(
    (relatedNode: object) => graph[relatedNode].indexOf(node) > -1
  );

  er.nodes = [node, relatedNode];

  return er;
}

function walkGraph(node: object, graph: object, state: object, result: any[], strict: string): string {
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

  const children: any[] = graph[node];
  const length: number = children.length;

  for (let i = 0; i < length; ++i) {
    const error: Error = walkGraph(children[i], graph, state, result, strict);

    if (error instanceof Error) {
      return error;
    }
  }

  state[node] = PERMANENT_MARKER;

  result.push(node);
}

function topologicalSort(graph: string, strict: string): any[] {
  const result: any[] = [];
  const state: Function = {};

  const nodes: any[] = Object.keys(graph);
  const length: number = nodes.length;

  for (let i = 0; i < length; ++i) {
    const er: string = walkGraph(nodes[i], graph, state, result, strict);

    if (er instanceof Error) {
      return er;
    }
  }

  return result;
}

export default topologicalSort;
