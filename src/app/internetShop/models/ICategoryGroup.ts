import {ICategory} from './ICategory';

export interface ICategoryGroup {
    id: number;
    categoryGroupName: string;
    sectionId: number;
    categories: ICategory[];
    priority: number;
}
