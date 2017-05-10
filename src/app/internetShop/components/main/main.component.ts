import {Component} from "@angular/core";
import {ICategory} from "../../models/ICategory";
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
    isSpinnerVisible: boolean = false;

    constructor(private shopService: ShopService) {
        this.isSpinnerVisible = true;
        this.shopService.getSections()
            .subscribe((sections: ISection[]) => {
                this.sections = sections;
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
    }
}
