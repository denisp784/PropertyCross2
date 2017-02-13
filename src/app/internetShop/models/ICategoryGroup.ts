import {ICategory} from "./ICategory";

export class ICategoryGroup {
  id: number;
  categoryGroupName: string;
  sectionId: number;
  categories: ICategory[];
}
