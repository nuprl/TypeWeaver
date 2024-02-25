export default keysShim;
declare var keysShim: ((o: any) => string[]) | typeof import("./implementation");
