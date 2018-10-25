import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable()
export class StockService {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getStock(token, page, role): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        return this._http.get(this.url + 'get-products/' + page + '/' + role, {headers: headers});
    }

}
