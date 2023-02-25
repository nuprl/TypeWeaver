export default function getProp (obj: any, ...props: string[]) {
    while (props.length > 0) {
        const prop = props.shift();

        if (!obj[prop]) {
            return undefined;
        }

        obj = obj[prop];
    }

    return obj;
}