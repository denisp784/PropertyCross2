import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class CatalogService {
  constructor(private appService: AppService) {}

  getBuilds() {
    const params = new URLSearchParams();

    params.set('place_name', 'London');
    params.set('action', 'search_listings');

    const url = `http://api.nestoria.co.uk/api?encoding=json`;
    return this.appService.makeGet(url, params);
  }
}
