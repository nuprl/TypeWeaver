export = reusify;
declare function reusify(Constructor: any): {
    get: () => any;
    release: (obj: any) => void;
};
