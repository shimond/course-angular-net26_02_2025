export interface Product {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly notes: string;
    readonly imageUrl?: string;
    readonly factoryAddress: Address;
}


export interface Address {
    homeNumber:number;
    street:string;
}

