export default function(node: Object) {
    // convert `\\` to `/`
    node.value = node.value.replace(/\\/g, '/');
};
