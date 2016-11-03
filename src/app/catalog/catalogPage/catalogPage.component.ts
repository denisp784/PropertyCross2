import { Component } from '@angular/core';
import {CatalogService} from '../catalog.service';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalogPage.template.html',
  styleUrls: ['catalogPage.css']
})

export class CatalogPageComponent {
  builds: any[];
  tmp: any = {};

  constructor(private catalogService: CatalogService) {
    this.tmp.value = 'test';
    catalogService.getBuilds()
      .then(builds => {
        this.builds = builds.listings;
      });
  }

  testF(text: string) {
    console.log(text);
  }
}
