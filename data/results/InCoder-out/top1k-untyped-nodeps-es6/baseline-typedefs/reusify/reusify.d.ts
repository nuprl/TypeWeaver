declare function reusify(Constructor: any): {
    get: () => any;
    release: (obj: Object) => void;
};
export default reusify;
