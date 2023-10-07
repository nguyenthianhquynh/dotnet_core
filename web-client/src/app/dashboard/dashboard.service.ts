import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlParams } from '../models/urlParams';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = 'http://localhost:5012/api/';

  constructor(private http: HttpClient) {
  }

  getProducts = (urlParams: UrlParams) => {
    let params = new HttpParams();
    params = params.append('sort', urlParams.sort);
    return this.http.get(this.baseUrl + 'products', { params })
  }
}
