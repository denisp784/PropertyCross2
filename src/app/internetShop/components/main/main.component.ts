import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {ICategory} from '../../models/ICategory';
import {ShopService} from '../../ShopService';
import {ISection} from '../../models/ISection';
import {IProduct} from '../../models/IProduct';
import * as _ from 'lodash';

@Component({
    selector: 'main',
    templateUrl: 'main.template.html',
    styleUrls: ['main.less'],
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
    ],

})
export class MainComponent implements OnInit {
    categories: ICategory[];
    sections: ISection[];
    isSpinnerVisible = false;
    lastProducts: IProduct[];
    productsInCart: IProduct[];
    alertText: string;
    showAlert = false;

    constructor(private shopService: ShopService) {
        this.isSpinnerVisible = true;
        this.shopService.getSections()
            .subscribe((sections: ISection[]) => {
                this.sections = sections;
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
    }
    
    ngOnInit() {
        this.shopService.getProducts()
            .subscribe((products: IProduct[]) => {
                this.lastProducts = _.takeRight(products, 8);
            });

        if (localStorage['products']) {
            this.productsInCart = JSON.parse(localStorage['products']);
        }
    }

    addToCart(product: IProduct) {
        if (localStorage['products']) {
            if (_.find(this.productsInCart, product)) {
                this.alertText = 'Товар уже есть в корзине';
                this.showAlert = !this.showAlert;
                setTimeout(() => this.showAlert = !this.showAlert, 3000);
                return;
            } else {
                this.productsInCart.push(product);
                localStorage['products'] = JSON.stringify(this.productsInCart);
                this.alertText = 'Товар добавлен в корзину';
                this.showAlert = !this.showAlert;
                setTimeout(() => this.showAlert = !this.showAlert, 3000);
            }
        } else {
            this.productsInCart = [];
            this.productsInCart.push(product);
            localStorage['products'] = JSON.stringify(this.productsInCart);
            this.alertText = 'Товар добавлен в корзину';
            this.showAlert = !this.showAlert;
            setTimeout(() => this.showAlert = !this.showAlert, 3000);
        }
    }
}
