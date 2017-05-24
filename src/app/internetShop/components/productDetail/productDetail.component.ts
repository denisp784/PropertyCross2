import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../ShopService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../models/ICategory';
import * as _ from 'lodash';
import {IProduct} from '../../models/IProduct';
import {DialogService} from '../../dialogModule/dialogService';
import {dialogConfigs} from '../../dialogs/dialogs.config';

@Component({
    selector: 'productDetail',
    templateUrl: 'productDetail.template.html',
    styleUrls: ['productDetail.less']
})

export class ProductDetailComponent implements OnInit {
    constructor(private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialogService: DialogService) {
    }

    product: IProductFullInfo = <IProductFullInfo>{};
    category: ICategory;
    isAddProduct = false;
    fullImageId: number;
    products: IProduct[];

    ngOnInit() {
        let localParams;
        this.activatedRoute.params
            .flatMap((params: Params) => {
                localParams = params;
                return this.shopService.getCategoryByUrl(params['url']);
            })
            .flatMap((category) => {
                this.category = category;
                if (!+localParams['id']) {
                    return Observable.throw('');
                }
                return this.shopService.getProductFullInfo(localParams['id']);
            })
            .subscribe(
                (product: IProductFullInfo) => {
                    if (!product.product || product.product.category.urlName !== localParams.url) {
                        this.router.navigate(['/']);
                    }
                    this.product = product;
                },
                () => this.router.navigate(['/'])
            );
    }

    showFullImage(id: number): void {
        this.fullImageId = id;
    }

    addToCart(product: IProduct) {
        if (localStorage['products']) {
            this.products = JSON.parse(localStorage['products']);
            if (_.find(this.products, product) !== -1) {
                console.log('Уже есть в корзине');
                return;
            }
            this.products.push(product);
            localStorage['products'] = JSON.stringify(this.products);
        } else {
            this.products = [];
            this.products.push(product);
            localStorage['products'] = JSON.stringify(this.products);
        }
    }

    deleteProduct(id: number) {
        const confirmDeleteDialog = dialogConfigs.confirmDeleteDialogConfig;

        this.dialogService.showDialog(confirmDeleteDialog)
            .flatMap(() => {
                return this.shopService.deleteProduct(id);
            })
            .subscribe(() => {
                this.router.navigate(['', this.category.urlName]);
            }, () => {});
    }
}