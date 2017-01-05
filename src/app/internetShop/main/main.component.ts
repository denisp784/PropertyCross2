import {Component} from "@angular/core";
import {ICategory} from "../models/ICategory";
import IPromise = Q.IPromise;
import {ShopService} from "../ShopService";

@Component({
  selector: 'main',
  templateUrl: 'main.template.html',
  styleUrls: ['./main.less']
})
export class MainComponent {
  categories: ICategory[];

  constructor(private shopService: ShopService) {
    /*for (let i = 0; i < 10; i++) {
      this.shopService.addCategory('Category' + i);
    }*/

    this.shopService.getCategories()
      .then((categories) => {
        console.log(categories);
        this.categories = categories;
      });
  }
}
