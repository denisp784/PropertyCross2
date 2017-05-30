import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {ShopService} from '../../ShopService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../models/ICategory';
import * as _ from 'lodash';
import {IProduct} from '../../models/IProduct';
import {DialogService} from '../../dialogModule/dialogService';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {StorageService} from '../../StorageService';

@Component({
    selector: 'productDetail',
    templateUrl: 'productDetail.template.html',
    styleUrls: ['productDetail.less'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateY(50%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateY(50%)', opacity: 0}))
                ])
            ]
        )
    ]
})

export class ProductDetailComponent implements OnInit {
    constructor(private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialogService: DialogService,
                private storageService: StorageService) {
    }

    product: IProductFullInfo = <IProductFullInfo>{};
    category: ICategory;
    isAddProduct = false;
    fullImageId: number;
    productsInCart: IProduct[];
    showAlert = false;
    alertText: string;

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

        if (localStorage['products']) {
            this.productsInCart = JSON.parse(localStorage['products']);
        }
    }

    showFullImage(id: number): void {
        this.fullImageId = id;
    }

    addToCart(product: IProduct) {
        if (localStorage['products']) {
            if (_.find(this.productsInCart, product)) {
                this.storageService.alertText = 'Товар уже есть в корзине';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
                return;
            } else {
                this.productsInCart.push(product);
                localStorage['products'] = JSON.stringify(this.productsInCart);
                this.storageService.alertText = 'Товар добавлен в корзину';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
            }
        } else {
            this.productsInCart = [];
            this.productsInCart.push(product);
            localStorage['products'] = JSON.stringify(this.productsInCart);
            this.storageService.alertText = 'Товар добавлен в корзину';
            this.storageService.showAlert = true;
            setTimeout(() => this.storageService.showAlert = false, 3000);
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
                this.storageService.alertText = 'Товар успешно удалён';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
            }, () => {
            });
    }
}