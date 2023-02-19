export default function ensureObject (obj: ny,  ...props: tring[]) {
    while (props.length > 0) {
        const prop = props.shift();

        if (!obj[prop]) {
            obj[prop] = {};
        }

        obj = obj[prop];
    }
}