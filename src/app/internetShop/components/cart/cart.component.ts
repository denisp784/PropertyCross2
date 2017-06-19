import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {IProduct} from '../../models/IProduct';
import * as _ from 'lodash';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {DialogService} from '../../dialogModule/dialogService';

@Component({
    selector: 'cart',
    templateUrl: 'cart.template.html',
    styleUrls: ['cart.less'],
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

export class CartComponent implements OnInit {
    constructor(private dialogService: DialogService) {
    }

    isSpinnerVisible = false;
    productsInCart: any[];
    showAlert = false;
    alertText: string;
    count = 1;

    ngOnInit() {
        this.isSpinnerVisible = true;
        this.productsInCart = JSON.parse(localStorage['products']);
        setTimeout(() => this.isSpinnerVisible = false, 500);
    }

    deleteFromCart(product: IProduct) {
        const confirmDeleteDialog = dialogConfigs.confirmDeleteDialogConfig;

        this.dialogService.showDialog(confirmDeleteDialog)
            .subscribe(() => {
                this.productsInCart.splice(_.indexOf(this.productsInCart, product), 1);
                localStorage['products'] = JSON.stringify(this.productsInCart);
                this.alertText = 'Товар удалён из корзины';
                this.showAlert = !this.showAlert;
                setTimeout(() => this.showAlert = !this.showAlert, 3000);
            });
    }
    
    save() {
        localStorage['products'] = JSON.stringify(this.productsInCart);
    }

    getSum(): number {
        return _.reduce(this.productsInCart, (result, product, key) => {
            return result + product.price * product.count;
        }, 0);
    }
}