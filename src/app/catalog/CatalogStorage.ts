import {IBuild} from './models/IBuild';
import {Injectable} from '@angular/core';

@Injectable()
export class CatalogStorage {
  build: IBuild;
}
