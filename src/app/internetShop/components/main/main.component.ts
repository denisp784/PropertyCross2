import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {ICategory} from '../../models/ICategory';
import {ShopService} from '../../ShopService';
import {ISection} from '../../models/ISection';
import {IProduct} from '../../models/IProduct';
import * as _ from 'lodash';
import {StorageService} from '../../StorageService';

@Component({
    selector: 'main',
    templateUrl: 'main.template.html',
    styleUrls: ['main.less']
})
export class MainComponent implements OnInit {
    categories: ICategory[];
    sections: ISection[];
    isSpinnerVisible = false;
    lastProducts: IProduct[];
    productsInCart: IProduct[];
    alertText: string;
    showAlert = false;

    constructor(private shopService: ShopService,
                private storageService: StorageService) {
    }

    ngOnInit() {
        this.isSpinnerVisible = true;

        this.shopService.getSections()
            .flatMap((sections: ISection[]) => {
                this.sections = sections;
                return this.shopService.getProducts();
            })
            .subscribe((products: IProduct[]) => {
                this.lastProducts = _.takeRight(products, 8);
                if (localStorage['products']) {
                    this.productsInCart = JSON.parse(localStorage['products']);
                }
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
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
}
