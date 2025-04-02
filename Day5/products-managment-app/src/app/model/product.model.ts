export interface Product {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly notes: string;
    readonly imageUrl?: string;
    readonly factoryAddress: Address;
    readonly reviews: UserReview[];
}

export interface UserReview {
    readonly userName: string;
    readonly review: string;
}
export interface Address {
    readonly homeNumber: number;
    readonly street: string;
}

