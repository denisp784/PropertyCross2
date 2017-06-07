import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Injectable, Inject} from '@angular/core';
import {CookieService} from "./internetShop/CookieService";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';

export const APP_ROOT_PATH = 'http://localhost:8080/';

@Injectable()
export class AppService {
    constructor(@Inject(Http) private http: Http,
                private cookieService: CookieService) {
    }

    authRequest() {
        let headers = new Headers();

        let userpass = this.cookieService.getCookie('auth');

        if (userpass) {
            headers.append('Authorization', userpass);
        }

        return headers;
    }

    private makeRequest(url: string, type: string, data?: any) {
        const fullPath = APP_ROOT_PATH + url;
        let headers = this.authRequest();

        return this.getRequest(type, fullPath, data, {headers})
            .map(response => response.json())
            .catch((error: any) => {
                if (error.status === 401) {
                    this.cookieService.deleteCookie('auth');
                }
                return Observable.throw(error);
            });
    }

    private getRequest(type: string, url: string, data: any, headers: any) {
        if (type === 'get') {
            return this.http.get(url, headers);
        }

        if (type === 'post') {
            return this.http.post(url, data, headers);
        }
    }

    makeGet(url: string): Observable<any> {
        return this.makeRequest(url, 'get', null);
    }

    makePost(url: string, data: any): Observable<any> {
        return this.makeRequest(url, 'post', data);
    }

    uploadFile(url: string, file: any): Observable<any> {
        const formData = new FormData();
        const fullPath = APP_ROOT_PATH + url;

        return new Observable(observer => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('image', file);
            xhr.open('POST', fullPath, true);

            xhr.onload = () => observer.next(JSON.parse(xhr.response));
            xhr.onerror = () => observer.error({
                status: xhr.status,
                statusText: xhr.statusText
            });

            xhr.send(formData);
        });
    }

/*    catchError(err: string) {
        console.log(err);
    }*/
}
