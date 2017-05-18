import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../ShopService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {error} from 'selenium-webdriver';
import {Observable} from 'rxjs/Observable';

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

    ngOnInit() {
        let localParams;
        this.activatedRoute.params
            .flatMap((params: Params) => {
                localParams = params;
                return this.shopService.getCategoryByUrl(params['url']);
            })
            .flatMap(() => {
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
}