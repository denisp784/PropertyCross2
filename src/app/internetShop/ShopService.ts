import {Injectable} from '@angular/core';
import {ICategory} from './models/ICategory';
import {AppService} from '../app.service';
import {ISection} from './models/ISection';
import {ICategoryGroup} from './models/ICategoryGroup';
import {IProperty} from './models/IProperty';
import {IPropertyInCategory} from './models/IPropertyInCategory';
import {IUser} from './models/IUser';
import {Observable} from 'rxjs';
import {IProduct} from './models/IProduct';
import {IProductProperty} from './models/IProductProperty';
import {IProductFullInfo} from './models/IProductFullInfo';
import {IOpinion} from './models/IOpinion';
import {IFilter} from './models/IFilter';
import {IPrice} from './models/IPrice';
import {IPropertyWithValues} from './models/IPropertyWithValues';

const CATEGORIES = 'categories';
const SECTIONS = 'sections';
const CATEGORY_GROUPS = 'categoryGroups';
const PROPERTIES = 'properties';
const CATEGORY_PROPERTIES = 'categoryProperties';
const USER_ROLES = 'userRoles';
const USERS = 'users';
const PRODUCTS = 'products';
const PRODUCT_PROPERTY = 'productPropertyValues';
const IMAGES = 'images';
const OPINIONS = 'opinions';
const PRICES = 'prices';

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
        return this.appService.makeGet(`${CATEGORIES}/getByUrl?url=${url}`);
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

    getPropertyById(propertyId: number): Observable<IProperty> {
        return this.appService.makeGet(`${PROPERTIES}/get/${propertyId}`);
    }

    updateProperty(property: IProperty): Observable<IProperty> {
        return this.appService.makePost(`${PROPERTIES}/update`, property);
    }

    deleteProperty(propertyId: number): Observable<IProperty> {
        return this.appService.makeGet(`${PROPERTIES}/delete/${propertyId}`);
    }

    addPropertyInCategory(property: IPropertyInCategory): Observable<IPropertyInCategory> {
        return this.appService.makePost(`${CATEGORY_PROPERTIES}/add`, property);
    }

    getPropertiesByCategory(categoryId: number): Observable<IProperty[]> {
        return this.appService.makeGet(`${CATEGORY_PROPERTIES}/getByCategory?categoryId=${categoryId}`);
    }

    getByCategoryWithValues(id: number): Observable <IPropertyWithValues[]> {
        return this.appService.makeGet(`${CATEGORY_PROPERTIES}/getByCategoryWithValues?categoryId=${id}`);
    }

    checkUserRole(): Observable<any> {
        return this.appService.makeGet(`${USER_ROLES}/login`);
    }

    addUser(user: IUser): Observable <IUser> {
        return this.appService.makePost(`${USERS}/add`, user);
    }

    userRegistration(user: IUser): Observable <IUser> {
        return this.appService.makePost(`${USERS}/userRegistration`, user);
    }

    checkUserExist(login: string): Observable <boolean> {
        return this.appService.makeGet(`${USERS}/userExists?login=${login}`);
    }

    addProduct(product: IProduct): Observable <IProduct> {
        return this.appService.makePost(`${PRODUCTS}/add`, product);
    }

    getProducts(): Observable <IProduct[]> {
        return this.appService.makeGet(`${PRODUCTS}/get`);
    }

    getProductByName(name: string): Observable <IProduct[]> {
        return this.appService.makeGet(`${PRODUCTS}/getByName/${name}`);
    }

    getFullInfoByCategory(id: number, propertyObject: IFilter): Observable <IProductFullInfo[]> {
        return this.appService.makePost(`${PRODUCTS}/getFullInfoByCategory/${id}`, propertyObject);
    }

    getProductFullInfo(id: number): Observable <IProductFullInfo> {
        return this.appService.makeGet(`${PRODUCTS}/getFullInfo/${id}`);
    }

    deleteProduct(id: number): Observable <IProduct> {
        return this.appService.makeGet(`${PRODUCTS}/delete/${id}`);
    }

    addPropertyInProduct(productProperty: IProductProperty): Observable <IProductProperty> {
        return this.appService.makePost(`${PRODUCT_PROPERTY}/addAll`, productProperty);
    }

    updatePropertyInProduct(productProperty: IProductProperty): Observable <IProductProperty> {
        return this.appService.makePost(`${PRODUCT_PROPERTY}/update`, productProperty);
    }

    deleteImage(id: number): Observable <any> {
        return this.appService.makeGet(`${IMAGES}/delete/${id}`);
    }

    addOpinion(opinions: IOpinion): Observable <IOpinion> {
        return this.appService.makePost(`${OPINIONS}/add`, opinions);
    }

    getOpinion(id: number): Observable <IOpinion> {
        return this.appService.makeGet(`${OPINIONS}/get/${id}`);
    }

    deleteOpinion(id: number): Observable <any> {
        return this.appService.makeGet(`${OPINIONS}/delete/${id}`);
    }

    addPrice(price: IPrice): Observable <IPrice> {
        return this.appService.makePost(`${PRICES}/add`, price);
    }
}
