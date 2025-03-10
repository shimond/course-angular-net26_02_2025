export interface Person {
    readonly id: number;
    readonly name: string;
    readonly email:string;
    readonly gender: 'M' | 'F' | 'Other';
}