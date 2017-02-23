import {Component} from "@angular/core";
import {ICategory} from "../../models/ICategory";
import IPromise = Q.IPromise;
import {ShopService} from "../../ShopService";
import {ISection} from "../../models/ISection";

@Component({
    selector: 'main',
    templateUrl: 'main.template.html',
    styleUrls: ['main.less']
})
export class MainComponent {
    categories: ICategory[];
    sections: ISection[];

    constructor(private shopService: ShopService) {
        this.shopService.getSections()
            .then((sections: ISection[]) => {
                this.sections = sections;
            });
    }
}