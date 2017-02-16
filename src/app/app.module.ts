import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {MaterialModule} from '@angular/material';
import {RouterModule, Router, Event, NavigationEnd} from '@angular/router';
import {MainComponent} from './internetShop/main/main.component';
import {CategoriesComponent} from "./internetShop/category/category.component";
import {ShopService} from "./internetShop/ShopService";
import {SectionsComponent} from "./internetShop/sections/sections.component";
import {CategoryGroupComponent} from "./internetShop/categoryGroup/categoryGroup.component";
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DialogConfigModule} from "./internetShop/dialogModule/dialogConfig.module";
import {DialogsModule} from "./internetShop/dialogs/Dialogs.module";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        CategoriesComponent,
        SectionsComponent,
        CategoryGroupComponent
    ],
    imports: [
        DialogsModule,
        DialogConfigModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2Bs3ModalModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot([
            {path: '', component: MainComponent},
            {path: 'categoryGroup/:sectionId', component: CategoryGroupComponent}
        ])
    ],
    providers: [
        AppService,
        ShopService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
