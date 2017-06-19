import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MainComponent} from './main.component';
import {ShopService} from '../../ShopService';
import {DebugElement} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {SpinnerComponent} from '../spinner/spinner.component';
import {SectionsComponent} from '../sections/sections.component';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from '../cart/cart.component';
import {CategoryDetailComponent} from '../categoryDetail/categoryDetail.component';
import {CategoryGroupComponent} from '../categoryGroup/categoryGroup.component';
import {FilterComponent} from '../filter/filter.component';
import {ProductsComponent} from '../products/products.component';
import {CategoriesComponent} from '../category/category.component';
import {PropertiesComponent} from '../properties/properties.component';
import {AddProductComponent} from '../addProduct/addProduct.component';
import {ProductDetailComponent} from '../productDetail/productDetail.component';
import {AppComponent} from '../../../app.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AlertComponent} from 'app/internetShop/components/alert/alert.component';
import {DialogsModule} from 'app/internetShop/dialogs/Dialogs.module';
import {DialogConfigModule} from '../../dialogModule/dialogConfig.module';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {AppService} from '../../../app.service';
import {StorageService} from '../../StorageService';
import {AuthService} from '../../AuthService';
import {CookieService} from '../../CookieService';
import {RatingModule} from 'ng2-rating';

const routes_path: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: ':url',
        component: CategoryDetailComponent
    },
    {
        path: ':url/:id',
        component: CategoryDetailComponent
    },
    {
        path: '**',
        redirectTo: '/'
    },
];

class MockStorageService {}
class MockShopService {}
class MockAuthService {}
class MockAppService {}
class MockCookieService {}


let comp: MainComponent;
let fixture: ComponentFixture<MainComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('Тестируем MainComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MainComponent,
                CategoriesComponent,
                SectionsComponent,
                CategoryGroupComponent,
                CategoryDetailComponent,
                HeaderComponent,
                PropertiesComponent,
                ProductsComponent,
                FilterComponent,
                AddProductComponent,
                SpinnerComponent,
                ProductDetailComponent,
                CartComponent,
                FooterComponent,
                AlertComponent
            ],
            providers: [
                StorageService,
                ShopService,
                AuthService,
                AppService,
                CookieService,
                {
                    provide: APP_BASE_HREF,
                    useValue: '/'
                }
            ],
            imports: [
                DialogsModule,
                DialogConfigModule,
                BrowserModule,
                CommonModule,
                FormsModule,
                HttpModule,
                Ng2Bs3ModalModule,
                BrowserAnimationsModule,
                RouterModule.forRoot(routes_path),
                RatingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MainComponent);
        comp = fixture.componentInstance;
    });

    it('Span должен содержать "Последние товары на сайте"', () => {
        de = fixture.debugElement.query(By.css('.last-products'));
        el = de.nativeElement;
        const content = el.textContent;
        expect(content).toEqual('Последние товары сайте');
    });
});
