import {Injectable} from "@angular/core";
import IPromise = Q.IPromise;
import {ICategory} from "./models/ICategory";
import {AppService} from "../app.service";

const CATEGORIES = 'categories';

@Injectable()
export class ShopService {

  constructor(private appService: AppService) {}

  getCategories(): IPromise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORIES}/get`);
  }

  addCategory(category: ICategory): Promise<ICategory> {
    return this.appService.makePost(`${CATEGORIES}/add`, category);
  }

  deleteCategory(categoryId: number): Promise<ICategory[]> {
    return this.appService.makeGet(`${CATEGORIES}/delete/${categoryId}`);
  }
}
