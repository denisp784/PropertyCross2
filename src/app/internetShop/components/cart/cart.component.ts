import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'cart',
    templateUrl: 'cart.template.html',
    styleUrls: ['cart.less']
})

export class CartComponent implements OnInit {
    isSpinnerVisible = false;

    ngOnInit() {
        this.isSpinnerVisible = true;
        setTimeout(() => this.isSpinnerVisible = false, 500);
    }
}