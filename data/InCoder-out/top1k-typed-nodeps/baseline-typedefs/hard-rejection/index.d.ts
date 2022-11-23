declare const util: any;
declare let installed: boolean;
declare const hardRejection: (log?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => void;
