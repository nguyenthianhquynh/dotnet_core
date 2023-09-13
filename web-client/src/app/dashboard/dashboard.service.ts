import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = 'http://localhost:5012/api/';

  constructor(private http: HttpClient) {
  }

  getProducts = () => {
    this.http.get(this.baseUrl + 'products').subscribe((data) => {
      console.log(data);
    });
  }
}
