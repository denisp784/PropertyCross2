import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProperty} from '../../models/IProperty';
import {ShopService} from '../../ShopService';
import {ICategory} from '../../models/ICategory';
import {IProduct} from '../../models/IProduct';
import {IProductProperty} from '../../models/IProductProperty';
import * as _ from 'lodash';
import {SimpleModel} from '../../models/SimpleModel';
import {AppService} from '../../../app.service';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {Router} from '@angular/router';

interface IFileReaderEventTarget extends EventTarget {
    result: string;
}

interface IFileReaderEvent extends Event {
    target: IFileReaderEventTarget;
    getMessage(): string;
}

@Component({
    selector: 'add-product',
    templateUrl: 'addProduct.template.html',
    styleUrls: ['addProduct.less']
})

export class AddProductComponent implements OnInit {
    constructor(private shopService: ShopService,
                private appService: AppService,
                private router: Router) {
    }

    isSpinnerVisible: boolean = false;

    ngOnInit() {
        this.isSpinnerVisible = true;

        if (!this.isEdit) {
            this.getProperties();
        } else {
            this.getProduct(this.productId);
        }

    }

    @Input() isEdit: boolean;
    @Input() category: ICategory = <ICategory>{};
    @Input() productId: number;
    @Output() closeAddProductEvent = new EventEmitter;
    @Output() addProductEvent = new EventEmitter;

    properties: IProperty[];
    product: IProduct = <IProduct>{};
    productProperty: IProductProperty = <IProductProperty>{};
    propertiesArray = [];
    file: any;
    pictures = [];
    mainId = 0;

    closeAddProduct(): void {
        this.closeAddProductEvent.emit();
    }

    getProperties(): void {
        this.shopService.getPropertiesByCategory(this.category.id)
            .map((prop) => {
                let propertyObject = {};
                let propertyArray = [];
                _.map(prop, (prop) => {
                    propertyObject = {
                        property: {
                            id: prop.id,
                            name: prop.name
                        },
                        value: null
                    };
                    propertyArray.push(propertyObject);
                });
                return propertyArray;
            })
            .subscribe((properties) => {
                this.propertiesArray = properties;
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
    }

    getProduct(id: number): void {
        this.shopService.getProductFullInfo(id)
            .map((product) => {
                this.product = product.product;
                this.category.id = product.product.category.id;
                let propertyObject = {};
                let propertyArray = [];
                _.map(product.properties, (prop) => {
                    propertyObject = {
                        property: {
                            id: prop.id,
                            name: prop.name
                        },
                        value: prop.value,
                        propertyValueId: prop.propertyValueId
                    };
                    propertyArray.push(propertyObject);
                });
                return propertyArray;
            })
            .subscribe((properties) => {
                this.propertiesArray = properties;
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
    }

    addProduct(): void {
        if (!this.product.mainImageId) {
            this.product.mainImageId = this.product.images[0];
        }
        this.product.category = {
            id: this.category.id
        };

        this.shopService.addProduct(this.product)
            .mergeMap((product) => {
                this.productProperty.product = product;
                this.productProperty.propertiesValues = this.propertiesArray;

                return this.shopService.addPropertyInProduct(this.productProperty);
            })
            .subscribe(() => {
                console.log('Добавлено');
                this.router.navigate(['', this.category.urlName]);
            });
    }

    updateProduct(): void {
        this.productProperty.product = this.product;
        this.productProperty.propertiesValues = this.propertiesArray;
        this.shopService.addPropertyInProduct(this.productProperty)
            .subscribe(() => 'тип обновлено');
    }

    onFileChange(event: any, type: string): void {
        let file = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            /*            reader.onload = (e: IFileReaderEvent) => {
             if (type === 'mainImage') {
             this.previewImg = e.target.result;
             }
             };*/

            reader.readAsDataURL(event.target.files[0]);
        }

        this.uploadImages(file);
    }

    uploadImages(file: any): void {
        this.appService.uploadFile('images/upload', file)
            .subscribe((imageData: SimpleModel) => {
                this.pictures.push(imageData.id);
                this.product.images = this.pictures;
            });
    }

    deleteImage(id: number): void {
        this.shopService.deleteImage(this.product.images[id])
            .subscribe(() => {
                this.product.images.splice(id, 1);
                if (this.mainId === id) {
                    this.mainId = 0;
                }
                console.log('удалено');
            });
    }

    setMain(id: number): void {
        this.mainId = id;
        this.product.mainImageId = this.product.images[id];
    }

    isAddDisabled(productName): boolean {
        return productName.invalid;
    }
}