import {Http, Response, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Injectable, Inject} from '@angular/core';

export const APP_ROOT_PATH = 'http://localhost:8080/';

@Injectable()
export class AppService {
    constructor(@Inject(Http) private http: Http) {
    }

    authRequest(username: string, password: string) {
        let headers = new Headers();

        headers.append("Authorization", "Basic " + btoa(username + ":" + password));

        return headers;
    }

    private makeRequest(url: string, type: string, data?: any) {
        const fullPath = APP_ROOT_PATH + url;

        let headers = this.authRequest('admin', 'admin');

        return this.getRequest(type, fullPath, data, {headers})
            .map(response => response.json())
            .toPromise()
            .catch(() => {
                alert('rrrrrr');
            });
    }

    private getRequest(type: string, url: string, data: any, headers: any) {
        if (type === 'get') {
            return this.http.get(url, headers);
        }

        if (type === 'post') {
            return this.http.post(url, data, headers)
        }
    }

    makeGet(url: string): Promise<any> {

        return this.makeRequest(url, 'get', null)
    }

    makePost(url: string, data: any): Promise<any> {

        return this.makeRequest(url, 'post', data)
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
