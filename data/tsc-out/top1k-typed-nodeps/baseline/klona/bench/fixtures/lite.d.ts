declare const _exports: {
    _id: string;
    index: number;
    nickname: null;
    isActive: boolean;
    balance: number;
    password: undefined;
    picture: string;
    age: number;
    joined: Date;
    locales: RegExp;
    details: {
        email: string;
        address: {
            street: string;
            city: string;
            state: string;
            zipcode: number;
            coords: {
                latitude: number;
                longitude: number;
            };
        };
    };
    interests: string[];
    friends: {
        id: number;
        name: string;
        friends_common: {
            count: number;
            friends_of_friends: {
                id: number;
                name: string;
            }[];
        };
    }[];
}[];
export = _exports;
