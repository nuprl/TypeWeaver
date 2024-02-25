export = cssesc;
declare function cssesc(string: any, options: any): string;
declare namespace cssesc {
    namespace options {
        const escapeEverything: boolean;
        const isIdentifier: boolean;
        const quotes: string;
        const wrap: boolean;
    }
    const version: string;
}
