import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Product } from '../models/product';
import { UrlParams } from '../models/urlParams';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: Product[] = [];
  urlParams = new UrlParams();

  constructor(private service:DashboardService) {

  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.service.getProducts(this.urlParams).subscribe({
      next: (_products: any) => {
        this.products = _products;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  sort(event: any) {
    this.urlParams.sort = event.target.value;
    this.getProducts();
  }
}
