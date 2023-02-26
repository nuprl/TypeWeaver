export default function getSideChannel(): {
    assert: (key: string) => void;
    get: (key: string) => any;
    has: (key: string) => any;
    set: (key: string, value: any) => void;
};
