import {Injectable, EventEmitter} from "@angular/core";
import {ICategory} from "./models/ICategory";
import {AppService} from "../app.service";
import {ISection} from "./models/ISection";
import {ICategoryGroup} from "./models/ICategoryGroup";
import {IProperty} from "./models/IProperty";
import {IPropertyInCategory} from "./models/IPropertyInCategory";
import {IUser} from "./models/IUser";
import {Observable} from "rxjs";

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

    getSections(): Observable<ISection[]> {
        return this.appService.makeGet(`${SECTIONS}/get`);
    }

    getSectionById(sectionId: string): Observable<ISection> {
        return this.appService.makeGet(`${SECTIONS}/get/${sectionId}`);
    }

    addSection(section: ISection): Observable<ISection> {
        return this.appService.makePost(`${SECTIONS}/add`, section);
    }

    deleteSection(sectionId: number): Observable<ISection[]> {
        return this.appService.makeGet(`${SECTIONS}/delete/${sectionId}`);
    }

    addCategory(category: ICategory): Observable<ICategory> {
        return this.appService.makePost(`${CATEGORIES}/add`, category);
    }

    deleteCategory(categoryId: number): Observable<ICategory[]> {
        return this.appService.makeGet(`${CATEGORIES}/delete/${categoryId}`);
    }

    getCategoryById(categoryId: number): Observable<ICategory> {
        return this.appService.makeGet(`${CATEGORIES}/get/${categoryId}`);
    }

    getCategoryByUrl(url: string): Observable<ICategory> {
        return this.appService.makeGet(`${CATEGORIES}/getByUrl?url=${url}`)
    }

    getCategoryGroupBySection(sectionId: number): Observable<ICategoryGroup[]> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/getBySection?sectionId=${sectionId}`);
    }

    getCategoryGroupById(sectionId: number): Observable<ICategoryGroup> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/get/${sectionId}`);
    }

    addCategoryGroup(categoryGroup: ICategoryGroup): Observable<ICategoryGroup> {
        return this.appService.makePost(`${CATEGORY_GROUPS}/add`, categoryGroup);
    }

    deleteCategoryGroup(categoryGroupId: number): Observable<ICategory[]> {
        return this.appService.makeGet(`${CATEGORY_GROUPS}/delete/${categoryGroupId}`);
    }

    addProperty(property: IProperty): Observable<IProperty> {
        return this.appService.makePost(`${PROPERTIES}/add`, property);
    }

    addPropertyInCategory(property: IPropertyInCategory): Observable<IPropertyInCategory> {
        return this.appService.makePost(`${CATEGORY_PROPERTIES}/add`, property);
    }

    checkUserRole(): Observable<any> {
        return this.appService.makeGet(`${USER_ROLES}/login`);
    }

    addUser(user: IUser): Observable <IUser> {
        return this.appService.makePost(`${USERS}/add`, user);
    }

    userRegistration(user: IUser): Observable <IUser> {
        return this.appService.makePost(`${USERS}/userRegistration`, user)
    }

    checkUserExist(login: string): Observable <boolean> {
        return this.appService.makeGet(`${USERS}/userExists?login=${login}`)
    }
}
