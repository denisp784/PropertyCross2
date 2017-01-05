import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {MaterialModule} from '@angular/material';
import {RouterModule, Router, Event, NavigationEnd} from '@angular/router';
import {MainComponent} from './internetShop/main/main.component';
import {CategoriesComponent} from "./internetShop/categories/categories.component";
import {ShopService} from "./internetShop/ShopService";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: MainComponent},
      {path: 'test', component: MainComponent}
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
