import { Component } from '@angular/core';
import {CatalogService} from '../catalog.service';
import {CatalogStorage} from '../CatalogStorage';
import {IBuild} from '../models/IBuild';
import {Router} from '@angular/router';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalogPage.template.html',
  styleUrls: ['catalogPage.css']
})

export class CatalogPageComponent {
  builds: any[];

  constructor(private catalogService: CatalogService,
              private catalogStorage: CatalogStorage,
              private router: Router) {
    catalogService.getBuilds()
      .then(builds => {
        this.builds = builds.listings;
      });
  }

  onBuildClick(build: IBuild) {
    this.catalogStorage.build = build;
    this.router.navigate(['/build']);
  }
}
