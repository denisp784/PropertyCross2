import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {MaterialModule} from '@angular/material';
import {RouterModule, Router, Event, NavigationEnd} from '@angular/router';
import {MainComponent} from './internetShop/components/main/main.component';
import {CategoriesComponent} from "./internetShop/components/category/category.component";
import {ShopService} from "./internetShop/ShopService";
import {SectionsComponent} from "./internetShop/components/sections/sections.component";
import {CategoryGroupComponent} from "./internetShop/components/categoryGroup/categoryGroup.component";
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DialogConfigModule} from "./internetShop/dialogModule/dialogConfig.module";
import {DialogsModule} from "./internetShop/dialogs/Dialogs.module";
import {StorageService} from "./internetShop/StorageService";
import { routes } from "./app.routes"
import {CategoryDetailComponent} from "./internetShop/components/categoryDetail/categoryDetail.component";
import {HeaderComponent} from "./internetShop/components/header/header.component";
import {AuthService} from "./internetShop/AuthService";
import {CookieService} from "./internetShop/CookieService";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        CategoriesComponent,
        SectionsComponent,
        CategoryGroupComponent,
        CategoryDetailComponent,
        HeaderComponent
    ],
    imports: [
        DialogsModule,
        DialogConfigModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2Bs3ModalModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(routes)
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
