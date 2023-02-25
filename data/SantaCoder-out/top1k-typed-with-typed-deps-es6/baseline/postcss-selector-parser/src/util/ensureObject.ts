export default function ensureObject (obj: any, ...props: string[]) {
    while (props.length > 0) {
        const prop = props.shift();

        if (!obj[prop]) {
            obj[prop] = {};
        }

        obj = obj[prop];
    }
}