import { Routes } from "@angular/router";
import {CategoryDetailComponent} from "./internetShop/components/categoryDetail/categoryDetail.component";
import {MainComponent} from "./internetShop/components/main/main.component";
import {PropertiesComponent} from './internetShop/components/properties/properties.component';
import {ProductDetailComponent} from './internetShop/components/productDetail/productDetail.component';
import {CartComponent} from './internetShop/components/cart/cart.component';

export const routes: Routes = [
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
