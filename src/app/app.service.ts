import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
  constructor(private http: Http) {
  }

  makeGet(url: string, params?: URLSearchParams): Promise<any> {
    return this.http.get(url, {search: params})
      .map(response => response.json().response)
      .toPromise();
  }

  catchError(err: string) {
    console.log(err);
  }
}
