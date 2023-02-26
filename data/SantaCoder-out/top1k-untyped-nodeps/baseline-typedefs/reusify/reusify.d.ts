declare function reusify(Constructor: Function): {
    get: () => any;
    release: (obj: any) => void;
};
