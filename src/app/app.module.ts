import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MainComponent} from './internetShop/components/main/main.component';
import {CategoriesComponent} from './internetShop/components/category/category.component';
import {ShopService} from './internetShop/ShopService';
import {SectionsComponent} from './internetShop/components/sections/sections.component';
import {CategoryGroupComponent} from './internetShop/components/categoryGroup/categoryGroup.component';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DialogConfigModule} from './internetShop/dialogModule/dialogConfig.module';
import {DialogsModule} from './internetShop/dialogs/Dialogs.module';
import {StorageService} from './internetShop/StorageService';
import { routes } from './app.routes';
import {CategoryDetailComponent} from './internetShop/components/categoryDetail/categoryDetail.component';
import {HeaderComponent} from './internetShop/components/header/header.component';
import {AuthService} from './internetShop/AuthService';
import {CookieService} from './internetShop/CookieService';
import {CommonModule} from '@angular/common';
import {PropertiesComponent} from './internetShop/components/properties/properties.component';
import {ProductsComponent} from './internetShop/components/products/products.component';
import {FilterComponent} from './internetShop/components/filter/filter.component';
import {AddProductComponent} from './internetShop/components/addProduct/addProduct.component';
import {SpinnerComponent} from './internetShop/components/spinner/spinner.component';
import {ProductDetailComponent} from './internetShop/components/productDetail/productDetail.component';
import {CartComponent} from './internetShop/components/cart/cart.component';
import {FooterComponent} from './internetShop/components/footer/footer.component';
import {AlertComponent} from './internetShop/components/alert/alert.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RatingModule} from 'ng2-rating';
import {ValuesPipe} from './internetShop/components/filter/filter.pipe';
import {SelectModule} from '../ng-select';

@NgModule({
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
        AlertComponent,
        ValuesPipe
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
        RouterModule.forRoot(routes),
        RatingModule,
        SelectModule
    ],
    providers: [
        AppService,
        ShopService,
        StorageService,
        AuthService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
