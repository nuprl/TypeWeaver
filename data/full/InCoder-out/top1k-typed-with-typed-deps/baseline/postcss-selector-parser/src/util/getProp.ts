export default function getProp (obj: ny,  ...props: tring[]) {
    while (props.length > 0) {
        const prop = props.shift();

        if (!obj[prop]) {
            return undefined;
        }

        obj = obj[prop];
    }

    return obj;
}