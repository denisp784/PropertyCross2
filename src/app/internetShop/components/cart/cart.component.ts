import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/IProduct';

@Component({
    selector: 'cart',
    templateUrl: 'cart.template.html',
    styleUrls: ['cart.less']
})

export class CartComponent implements OnInit {
    isSpinnerVisible = false;
    productsInCart: IProduct[];

    ngOnInit() {
        this.isSpinnerVisible = true;
        this.productsInCart = JSON.parse(localStorage['products']);
        setTimeout(() => this.isSpinnerVisible = false, 500);
    }
}