import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../ShopService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../models/ICategory';
import * as _ from 'lodash';

@Component({
    selector: 'productDetail',
    templateUrl: 'productDetail.template.html',
    styleUrls: ['productDetail.less']
})

export class ProductDetailComponent implements OnInit {
    constructor(private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    product: IProductFullInfo = <IProductFullInfo>{};
    category: ICategory;
    isAddProduct = false;
    fullImageId: number;
    productsId: number[];

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
                    console.log(this.product);
                    console.log(this.product.properties);
                },
                () => this.router.navigate(['/'])
            );
    }

    showFullImage(id: number): void {
        this.fullImageId = id;
    }

    addToCart(id: number) {
        if (localStorage['productsId']) {
            this.productsId = JSON.parse(localStorage['productsId']);
            if (_.indexOf(this.productsId, id) !== -1) {
                console.log('Уже есть в корзине');
                return;
            }
            this.productsId.push(id);
            localStorage['productsId'] = JSON.stringify(this.productsId);
        } else {
            this.productsId = [];
            this.productsId.push(id);
            localStorage['productsId'] = JSON.stringify(this.productsId);
        }
    }
}