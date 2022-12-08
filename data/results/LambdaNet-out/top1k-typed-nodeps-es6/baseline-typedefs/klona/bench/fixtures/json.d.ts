declare const _default: {
    _id: string;
    index: number;
    nickname: any;
    isActive: boolean;
    balance: number;
    picture: string;
    age: number;
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
export default _default;
