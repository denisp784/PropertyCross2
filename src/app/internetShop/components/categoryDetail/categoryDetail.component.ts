import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from '@angular/router';
import {ICategory} from "../../models/ICategory";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService"
import {ISection} from "../../models/ISection";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {DialogService} from "../../dialogModule/dialogService";
import {ICategoryGroup} from "../../models/ICategoryGroup";

@Component({
    selector: 'categoryDetail',
    templateUrl: 'categoryDetail.template.html',
    styleUrls: ['categoryDetail.less']
})

export class CategoryDetailComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
                private shopService: ShopService,
                private storageService: StorageService,
                private dialogService: DialogService) {
    }

    currentUrl: string;
    category: ICategory;
    sections: ISection[];
    showCategoryFlag: boolean;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentUrl = params['url'];
            this.loadContent();
        });
    }

    loadContent() {
        this.shopService.getSections()
            .then((sections) => {
                this.sections = sections;
                console.log(this.sections);
            });

        this.shopService.getCategoryByUrl(this.currentUrl)
            .then((category: ICategory) => {
                this.category = category;
                console.log(this.category);
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

    showSectionDialog(event, sectionId: number) {
        const sectionDialog = dialogConfigs.sectionDialogConfig;

        sectionDialog.data = {
            isEditFlag: arguments.length === 2,
            sectionId
        };

        sectionDialog.title = arguments.length === 2 ? 'Изменение секции' : 'Добавление секции';

        this.dialogService.showDialog(sectionDialog)
            .subscribe(() => {
                this.shopService.getSections()
                    .then((sections: ISection[]) => {
                            this.sections = sections;
                        }
                    )
            });
        event.stopPropagation();
    }

    showPropertiesDialog(id) {
        const propertiesDialog = dialogConfigs.propertiesDialogConfig;

        propertiesDialog.data = {
            id
        };

        this.dialogService.showDialog(propertiesDialog)
            .subscribe(() => {

            });
        event.stopPropagation();
    }
}
