import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from '@angular/router';
import {ICategory} from "../../models/ICategory";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService"
import {ISection} from "../../models/ISection";

@Component({
    selector: 'categoryDetail',
    templateUrl: 'categoryDetail.template.html',
    styleUrls: ['categoryDetail.less']
})


export class CategoryDetailComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
                private shopService: ShopService,
                private storageService: StorageService) {
    }

    currentUrl: string;
    category: ICategory;
    sections: ISection[];
    showCategoryFlag: boolean;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentUrl = params['url'];
        });

        this.shopService.getSections()
            .then((sections) => {
                this.sections = sections;
                console.log(this.sections);
            });

        this.shopService.getCategoryByUrl(this.currentUrl)
            .then((category: ICategory) => {
                this.category = category;
                console.log(this.category.categoryName);
            })
    }

    switchCategory(sectionId: number) {
        if (this.storageService.lastSection !== sectionId) {
            this.storageService.lastSection = sectionId;
            this.showCategoryFlag = true;
        } else {
            this.showCategoryFlag = !this.showCategoryFlag;
        }
    }
}
