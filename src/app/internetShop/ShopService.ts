import {Injectable, EventEmitter} from "@angular/core";
import IPromise = Q.IPromise;
import {ICategory} from "./models/ICategory";
import {AppService} from "../app.service";
import {ISection} from "./models/ISection";
import {ICategoryGroup} from "./models/ICategoryGroup";
import {IProperty} from "./models/IProperty";
import {IPropertyInCategory} from "./models/IPropertyInCategory";
import {IUser} from "./models/IUser";

const CATEGORIES = 'categories';
const SECTIONS = 'sections';
const CATEGORY_GROUPS = 'categoryGroups';
const PROPERTIES = 'properties';
const CATEGORY_PROPERTIES = 'categoryProperties';
const USER_ROLES = 'userRoles';
const USERS = 'users';

@Injectable()
export class ShopService {


    constructor(private appService: AppService) {
    }

    getSections(): IPromise<ISection[]> {
        return this.appService.makeGet(`${SECTIONS}/get`);
    }

    getSectionById(sectionId: string): IPromise<ISection> {
        return this.appService.makeGet(`${SECTIONS}/get/${sectionId}`);
    }

    addSection(section: ISection): Promise<ISection> {
        return this.appService.makePost(`${SECTIONS}/add`, section);
    }

    deleteSection(sectionId: number): Promise<ISection[]> {
        return this.appService.makeGet(`${SECTIONS}/delete/${sectionId}`);
    }

    addCategory(category: ICategory): Promise<ICategory> {
        return this.appService.makePost(`${CATEGORIES}/add`, category);
    }

    deleteCategory(categoryId: number): Promise<ICategory[]> {
        return this.appService.makeGet(`${CATEGORIES}/delete/${categoryId}`);
    }

    getCategoryById(categoryId: number): Promise<ICategory> {
        return this.appService.makeGet(`${CATEGORIES}/get/${categoryId}`);
    }

    getCategoryByUrl(url: string): Promise<ICategory> {
        return this.appService.makeGet(`${CATEGORIES}/getByUrl?url=${url}`)
    }

    getCategoryGroupBySection(sectionId: number): IPromise<ICategoryGroup[]> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/getBySection?sectionId=${sectionId}`);
    }

    getCategoryGroupById(sectionId: number): IPromise<ICategoryGroup> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/get/${sectionId}`);
    }

    addCategoryGroup(categoryGroup: ICategoryGroup): IPromise<ICategoryGroup> {
        return this.appService.makePost(`${CATEGORY_GROUPS}/add`, categoryGroup);
    }

    deleteCategoryGroup(categoryGroupId: number): Promise<ICategory[]> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/delete/${categoryGroupId}`);
    }

    addProperty(property: IProperty): Promise<IProperty> {
        return this.appService.makePost(`${PROPERTIES}/add`, property);
    }

    addPropertyInCategory(property: IPropertyInCategory): Promise<IPropertyInCategory> {
        return this.appService.makePost(`${CATEGORY_PROPERTIES}/add`, property);
    }

    checkUserRole(): Promise<any> {
        return this.appService.makeGet(`${USER_ROLES}/login`);
    }

    addUser(user: IUser): Promise <IUser> {
        return this.appService.makePost(`${USERS}/add`, user);
    }
}
