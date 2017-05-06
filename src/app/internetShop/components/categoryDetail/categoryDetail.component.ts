import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ICategory} from '../../models/ICategory';
import {ShopService} from '../../ShopService';
import {StorageService} from '../../StorageService';
import {ISection} from '../../models/ISection';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {DialogService} from '../../dialogModule/dialogService';

@Component({
    selector: 'category-detail',
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
    isPropertiesOpen = false;
    isProductsOpen = true;
    isAddProductOpen = false;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentUrl = params['url'];
            this.loadContent();
        });
    }

    loadContent() {
        this.shopService.getSections()
            .subscribe((sections) => {
                this.sections = sections;
            });

        this.shopService.getCategoryByUrl(this.currentUrl)
            .subscribe((category: ICategory) => {
                this.category = category;
            });
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
                    .subscribe((sections: ISection[]) => {
                            this.sections = sections;
                        }
                    );
            });
        event.stopPropagation();
    }

    openProperties(): void {
        if (this.isAddProductOpen) {
            this.isAddProductOpen = false;
        }
        if (this.isProductsOpen) {
            this.isProductsOpen = false;
        }
        if (this.isPropertiesOpen) {
            this.isProductsOpen = true;
            this.isPropertiesOpen = false;
            return;
        }
        this.isPropertiesOpen = !this.isPropertiesOpen;
    }

    openAddProduct(): void {
        if (this.isPropertiesOpen) {
            this.isPropertiesOpen = false;
        }
        if (this.isProductsOpen) {
            this.isProductsOpen = false;
        }
        if (this.isAddProductOpen) {
            this.isProductsOpen = true;
            this.isAddProductOpen = false;
            return;
        }
        this.isAddProductOpen = !this.isAddProductOpen;
    }

    closeProperties(): void {
        this.isPropertiesOpen = false;
        this.isProductsOpen = true;
    }

    closeAddProduct(): void {
        this.isAddProductOpen = false;
        this.isProductsOpen = true;
    }
}
