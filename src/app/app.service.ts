import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Injectable, Inject} from '@angular/core';

export const APP_ROOT_PATH = 'http://localhost:8080/';

@Injectable()
export class AppService {
  constructor(@Inject(Http) private http: Http) {
  }

  makeGet(url: string, params?: URLSearchParams): Promise<any> {
    const fullPath = APP_ROOT_PATH + url;

    return this.http.get(fullPath, {search: params})
      .map(response => response.json())
      .toPromise();
  }

  makePost(url: string, data: any): Promise<any> {
    const fullPath = APP_ROOT_PATH + url;

    return this.http.post(fullPath, data)
      .map(response => response.json().response)
      .toPromise();
  }

  uploadFile(url: string, file: any): Promise<any> {
    const formData = new FormData();
    const fullPath = APP_ROOT_PATH + url;

    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('image', file);
      xhr.open('POST', fullPath, true);

      xhr.onload = () => resolve(JSON.parse(xhr.response));
      xhr.onerror = () => reject({
        status: xhr.status,
        statusText: xhr.statusText
      });

      xhr.send(formData);
    });
  }

  catchError(err: string) {
    console.log(err);
  }
}
