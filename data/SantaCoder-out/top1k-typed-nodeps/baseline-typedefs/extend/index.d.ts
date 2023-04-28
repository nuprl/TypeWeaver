declare var hasOwn: (v: PropertyKey) => boolean;
declare var toStr: () => string;
declare var defineProperty: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
declare var gOPD: (o: any, p: PropertyKey) => PropertyDescriptor;
declare var isArray: (arr: any) => boolean;
declare var isPlainObject: (obj: any) => any;
declare var setProperty: (target: any, options: IPropertyOptions) => void;
declare var getProperty: (obj: any, name: string) => any;
