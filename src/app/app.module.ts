import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CatalogPageComponent} from './catalog/catalogPage/catalogPage.component';
import {AppService} from './app.service';
import {CatalogService} from './catalog/catalog.service';
import { MaterialModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import {BuildInfoComponent} from './catalog/buildInfo/buildInfo.component';
import {CatalogStorage} from './catalog/CatalogStorage';

@NgModule({
  declarations: [
    AppComponent,
    CatalogPageComponent,
    BuildInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {path: 'build', component: BuildInfoComponent},
      {path: 'builds', component: CatalogPageComponent},
      {path: '', component: CatalogPageComponent}
    ])
  ],
  providers: [
    AppService,
    CatalogService,
    CatalogStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
