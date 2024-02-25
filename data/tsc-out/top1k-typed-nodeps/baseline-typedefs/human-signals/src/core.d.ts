export const SIGNALS: ({
    name: string;
    number: number;
    action: string;
    description: string;
    standard: string;
    forced?: undefined;
} | {
    name: string;
    number: number;
    action: string;
    description: string;
    standard: string;
    forced: boolean;
})[];
