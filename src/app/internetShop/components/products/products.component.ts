import {Component, Input} from '@angular/core';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'products',
    templateUrl: 'products.template.html',
    styleUrls: ['products.less']
})

export class ProductsComponent {
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {}

    private sub: any;

    private parentRouteId: number;

    @Input() products: IProductFullInfo;

    openProduct(id: number, categoryName: string): void {
        this.router.navigate([``, categoryName, id]);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
        });
    }
}