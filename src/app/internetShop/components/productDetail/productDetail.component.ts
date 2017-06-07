import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../ShopService';
import {IProductFullInfo} from '../../models/IProductFullInfo';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../../models/ICategory';
import * as _ from 'lodash';
import {IProduct} from '../../models/IProduct';
import {DialogService} from '../../dialogModule/dialogService';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {StorageService} from '../../StorageService';
import {IOpinion} from '../../models/IOpinion';

const OPINION_GRADE = {
    1: 'жуть',
    2: 'ниже среднего',
    3: 'нормально',
    4: 'хорошо',
    5: 'отлично!'
};

@Component({
    selector: 'productDetail',
    templateUrl: 'productDetail.template.html',
    styleUrls: ['productDetail.less']
})

export class ProductDetailComponent implements OnInit {
    constructor(private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialogService: DialogService,
                private storageService: StorageService) {
    }

    product: IProductFullInfo = <IProductFullInfo>{};
    category: ICategory;
    isAddProduct = false;
    fullImageId: number;
    productsInCart: IProduct[];
    showAlert = false;
    alertText: string;
    opinion: IOpinion = <IOpinion>{};
    opinionGrade = OPINION_GRADE;
    anon = false;
    isSpinnerVisible = false;

    ngOnInit() {
        this.getProductInfo();
        if (localStorage['products']) {
            this.productsInCart = JSON.parse(localStorage['products']);
        }
    }

    getProductInfo(): void {
        this.isSpinnerVisible = true;
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
                    this.isSpinnerVisible = false;
                },
                () => this.router.navigate(['/'])
            );
    }

    showFullImage(id: number): void {
        this.fullImageId = id;
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

    deleteProduct(id: number) {
        const confirmDeleteDialog = dialogConfigs.confirmDeleteDialogConfig;

        this.dialogService.showDialog(confirmDeleteDialog)
            .flatMap(() => {
                return this.shopService.deleteProduct(id);
            })
            .subscribe(() => {
                this.router.navigate(['', this.category.urlName]);
                this.storageService.alertText = 'Товар успешно удалён';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
            }, () => {
            });
    }

    addOpinion(): void {
        this.opinion.product = {
            id: this.product.product.id,
        };
        this.opinion.anon = this.anon;

        this.shopService.addOpinion(this.opinion)
            .subscribe(() => {
                this.getProductInfo();
                this.storageService.alertText = 'Ваш отзыв успешно добавлен';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
                this.opinion.description = '';
            });
    }

    timeSince(date: number): string {
        let seconds = Math.ceil((<any>new Date() - date) / 1000);
        let interval = Math.ceil(seconds / 31536000);

        if (interval > 1) {
            return interval + this.declOfNum(interval, 'years');
        }
        interval = Math.ceil(seconds / 2592000);
        if (interval > 1) {
            return interval + this.declOfNum(interval, 'months');
        }
        interval = Math.ceil(seconds / 86400);
        if (interval > 1) {
            return interval + this.declOfNum(interval, 'days');
        }
        interval = Math.ceil(seconds / 3600);
        if (interval > 1) {
            return interval + this.declOfNum(interval, 'hours');
        }
        interval = Math.ceil(seconds / 60);
        if (interval > 1) {
            return interval + this.declOfNum(interval, 'minutes');
        }
        return Math.ceil(seconds) + this.declOfNum(seconds, 'seconds');
    }

    declOfNum(number: number, period: string): string {
        let cases = [2, 0, 1, 1, 1, 2];
        let words = {
            seconds: [' секунду', ' секунды', ' секунд'],
            minutes: [' минуту', ' минуты', ' минут'],
            hours: [' час', ' часа', ' часов'],
            days: ['день', 'дня', 'дней'],
            months: [' месяц', ' месяца', ' месяцев'],
            years: [' год', ' года', ' лет']
        };

        return words[period][(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    deleteOpinion(id: number) {
        const confirmDeleteDialog = dialogConfigs.confirmDeleteDialogConfig;

        this.dialogService.showDialog(confirmDeleteDialog)
            .flatMap(() => {
                return this.shopService.deleteOpinion(id);
            })
            .subscribe(() => {
                this.getProductInfo();
                this.storageService.alertText = 'Отзыв успешно удалён';
                this.storageService.showAlert = true;
                setTimeout(() => this.storageService.showAlert = false, 3000);
            }, () => {
            });
    }

    isAddOpinionDisabled(): boolean {
        return !this.opinion.mark || !this.opinion.description;
    }
}