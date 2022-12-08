export default function(node: Node) {
    // convert `\\` to `/`
    node.value = node.value.replace(/\\/g, '/');
};