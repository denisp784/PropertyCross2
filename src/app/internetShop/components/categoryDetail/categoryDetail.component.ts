import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ICategory} from '../../models/ICategory';
import {ShopService} from '../../ShopService';
import {StorageService} from '../../StorageService';
import {ISection} from '../../models/ISection';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {DialogService} from '../../dialogModule/dialogService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {Observable} from 'rxjs/Observable';
import {IFilter} from '../../models/IFilter';
import {IPropertyWithValues} from '../../models/IPropertyWithValues';

@Component({
    selector: 'category-detail',
    templateUrl: 'categoryDetail.template.html',
    styleUrls: ['categoryDetail.less']
})

export class CategoryDetailComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
                private shopService: ShopService,
                private storageService: StorageService,
                private dialogService: DialogService,
                private router: Router) {
    }

    currentUrl: string;
    category: ICategory;
    sections: ISection[];
    showCategoryFlag: boolean;
    isPropertiesOpen = false;
    isProductsOpen = true;
    isProductDetailOpen = false;
    isAddProductOpen = false;
    isSpinnerVisible = false;
    products: IProductFullInfo[];
    localParams: Params;
    filters: IFilter = <IFilter>{};
    propertiesWithValues: IPropertyWithValues[];

    ngOnInit() {
        this.isSpinnerVisible = true;
        this.activatedRoute.params
            .flatMap((params: Params) => {
                this.localParams = params;
                return this.shopService.getCategoryByUrl(params['url']);
            })
            .subscribe((category: ICategory) => {
                    if (category.urlName === this.localParams['url']) {
                        this.loadContent(category.urlName);
                    } else {
                        Observable.throw('');
                    }
                },
                (error) => {
                    this.router.navigate(['/']);
                }
            );
    }

    applyFilter(event: IFilter) {
        this.filters = event;
        this.shopService.getFullInfoByCategory(this.category.id, this.filters)
            .subscribe((products: IProductFullInfo[]) => {
                this.products = products;
            });
    }

    loadContent(category: string) {
        this.isSpinnerVisible = true;
        this.shopService.getSections()
            .flatMap((sections) => {
                this.sections = sections;
                return this.shopService.getCategoryByUrl(category);
            })
            .flatMap((category: ICategory) => {
                this.category = category;
                return this.shopService.getByCategoryWithValues(category.id);
            })
            .flatMap((response: IPropertyWithValues[]) => {
                this.propertiesWithValues = response;
                return this.shopService.getFullInfoByCategory(this.category.id, this.filters);
            })
            .subscribe((products: IProductFullInfo[]) => {
                if (!this.localParams['id']) {
                    this.products = products;
                    setTimeout(() => this.isSpinnerVisible = false, 500);
                    return;
                }
                if (this.localParams['id'] === 'add-product') {
                    this.isSpinnerVisible = false;
                    this.openAddProduct();
                    return;
                }
                if (this.localParams['id'] === 'add-property') {
                    this.isSpinnerVisible = false;
                    this.openProperties();
                    return;
                }
                if (+this.localParams['id']) {
                    this.isSpinnerVisible = false;
                    this.isProductDetailOpen = true;
                    return;
                }
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
}
