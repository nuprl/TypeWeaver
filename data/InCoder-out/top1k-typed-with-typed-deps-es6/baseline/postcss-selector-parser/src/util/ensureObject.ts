export default function ensureObject (obj: bject,  ...props: ny[]) {
    while (props.length > 0) {
        const prop = props.shift();

        if (!obj[prop]) {
            obj[prop] = {};
        }

        obj = obj[prop];
    }
}