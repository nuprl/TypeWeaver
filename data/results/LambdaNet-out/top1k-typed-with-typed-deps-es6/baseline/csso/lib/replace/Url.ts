export default function(node: object) {
    // convert `\\` to `/`
    node.value = node.value.replace(/\\/g, '/');
};
