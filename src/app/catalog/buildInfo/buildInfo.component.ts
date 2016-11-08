import {Component} from '@angular/core';
import {IBuild} from '../models/IBuild';
import {CatalogStorage} from '../CatalogStorage';
import {Router} from '@angular/router';

@Component({
  selector: 'build-info',
  templateUrl: 'buildInfo.template.html'
})

export class BuildInfoComponent {
  build: IBuild;

  constructor(private catalogStorage: CatalogStorage,
              router: Router) {
    this.build = this.catalogStorage.build;
    if (!this.build) {
      router.navigate(['']);
    }
  }
}
