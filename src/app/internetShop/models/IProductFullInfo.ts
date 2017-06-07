import {IProduct} from './IProduct';
export interface IProductFullInfo {
    product: IProduct;
    properties: {
        name: string;
        value: string;
    }[];
    opinions: any[];
    lastPrice: number;
}