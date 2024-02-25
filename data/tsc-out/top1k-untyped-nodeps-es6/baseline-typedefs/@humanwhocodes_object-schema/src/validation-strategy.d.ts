export class ValidationStrategy {
    static array(value: any): void;
    static boolean(value: any): void;
    static number(value: any): void;
    static object(value: any): void;
    static "object?"(value: any): void;
    static string(value: any): void;
    static "string!"(value: any): void;
}
