export const printWidth: number;
export const useTabs: boolean;
export const tabWidth: number;
export const trailingComma: string;
export const arrowParens: string;
export const overrides: ({
    files: string;
    options: {
        parser: string;
        useTabs: boolean;
    };
} | {
    files: string;
    options: {
        parser: string;
        useTabs?: undefined;
    };
})[];
