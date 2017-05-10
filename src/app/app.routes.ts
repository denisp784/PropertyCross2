import { Routes } from "@angular/router";
import {CategoryDetailComponent} from "./internetShop/components/categoryDetail/categoryDetail.component";
import {MainComponent} from "./internetShop/components/main/main.component";
import {PropertiesComponent} from './internetShop/components/properties/properties.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'category/:url',
        component: CategoryDetailComponent
    },
    {
        path: '**',
        redirectTo: '/'
    },
];
