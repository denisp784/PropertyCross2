import {Component} from "@angular/core";
import {ICategory} from "../models/ICategory";
import IPromise = Q.IPromise;
import {ShopService} from "../ShopService";
import {ISection} from "../models/ISection";
import * as moment from 'moment';

@Component({
  selector: 'main',
  templateUrl: 'main.template.html',
  styleUrls: ['./main.less']
})
export class MainComponent {
  categories: ICategory[];
  sections: ISection[];

  constructor(private shopService: ShopService) {
    /*for (let i = 0; i < 10; i++) {
      this.shopService.addCategory('Category' + i);
    }*/

    /*this.shopService.getCategories()
      .then((category) => {
        this.category = category;
      });*/

    this.shopService.getSections()
      .then((sections: ISection[]) => {
        this.sections = sections;
      });
  }
}
