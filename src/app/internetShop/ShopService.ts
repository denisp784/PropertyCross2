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

  addCategory(categoryName: string) {
    return this.appService.makePost(`${CATEGORIES}/add`, {categoryName});
  }
}
