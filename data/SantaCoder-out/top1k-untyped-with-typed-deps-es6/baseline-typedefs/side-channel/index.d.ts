export default function getSideChannel(): {
    assert: (key: any) => void;
    get: (key: any) => any;
    has: (key: any) => any;
    set: (key: any, value: any) => void;
};
