import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlParams } from '../models/urlParams';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = 'http://localhost:5012/api/';

  category1 = [
    {
      "name": "Boards",
      "id": 1,
      "types": [
        {
          "name": "Snowboards",
          "id": 1
        },
        {
          "name": "Skateboards",
          "id": 2
        },
        {
          "name": "Longboards",
          "id": 3
        }
      ]
    },
    {
      "name": "Hats",
      "id": 2
    },
    {
      "name": "Boots",
      "id": 3
    },
    {
      "name": "Gloves",
      "id": 4
    }
  ]

  private category = new BehaviorSubject<any[] | null>(null)
  category$ = this.category.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts = (urlParams: UrlParams) => {
    let params = new HttpParams();
    params = params.append('sort', urlParams.sort);
    return this.http.get(this.baseUrl + 'products', { params })
  }

  getProductById = (productId:number) => {
    return this.http.get<Product>(this.baseUrl + "products/" + productId)
  }

  getTypes = () => {
    return this.http.get(this.baseUrl + 'products/types').subscribe({
      next: (_types: any) => {
        this.category.next(this.category1);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
