import {IUser} from './IUser';

export interface IOpinion {
    anon: boolean;
    date: number;
    deleted: boolean;
    description: string;
    mark: number;
    product: {
        id: number;
    };
}