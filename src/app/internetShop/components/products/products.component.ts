import {Component, Input} from '@angular/core';
import {IProductFullInfo} from '../../models/IProductFullInfo';

@Component({
    selector: 'products',
    templateUrl: 'products.template.html',
    styleUrls: ['products.less']
})

export class ProductsComponent {
    @Input() products: IProductFullInfo;
}