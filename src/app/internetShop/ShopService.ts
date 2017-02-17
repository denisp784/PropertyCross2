import {Injectable, EventEmitter} from "@angular/core";
import IPromise = Q.IPromise;
import {ICategory} from "./models/ICategory";
import {AppService} from "../app.service";
import {ISection} from "./models/ISection";
import {ICategoryGroup} from "./models/ICategoryGroup";

const CATEGORIES = 'categories';
const SECTIONS = 'sections';
const CATEGORY_GROUPS = 'categoryGroups';

@Injectable()
export class ShopService {



  constructor(private appService: AppService) {}



  getSections(): IPromise<ISection[]> {
    return this.appService.makeGet(`${SECTIONS}/get`);
  }

  addSection(section: ISection): Promise<ISection> {
    return this.appService.makePost(`${SECTIONS}/add`, section);
  }

  getCategories(): IPromise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORIES}/get`);
  }

  getSectionCategories(sectionId: string): IPromise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORIES}/getBySection?sectionId=${sectionId}`);
  }

  addCategory(category: ICategory): Promise<ICategory> {
    return this.appService.makePost(`${CATEGORIES}/add`, category);
  }

  deleteCategory(categoryId: number): Promise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORIES}/delete/${categoryId}`);
  }

  deleteSection(sectionId: number): Promise<ISection[]> {
    return this.appService.makeGet(`${SECTIONS}/delete/${sectionId}`);
  }

  getCategoryGroups(): IPromise<ICategoryGroup[]> {
    return this.appService.makeGet(`${CATEGORY_GROUPS}/get`);
  }

  getCategoryGroupBySection(sectionId: number): IPromise<ICategoryGroup[]> {
    return this.appService.makeGet(`${CATEGORY_GROUPS}/getBySection?sectionId=${sectionId}`);
  }

  addCategoryGroup(categoryGroup: ICategoryGroup): IPromise<ICategoryGroup> {
    return this.appService.makePost(`${CATEGORY_GROUPS}/add`, categoryGroup);
  }

  deleteCategoryGroup(categoryGroupId: number): Promise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORY_GROUPS}/delete/${categoryGroupId}`);
  }
}
