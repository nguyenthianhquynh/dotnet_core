import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Product } from '../models/product';
import { UrlParams } from '../models/urlParams';
import { Type } from '../models/type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: Product[] = [];
  types: Type[] = [];
  urlParams = new UrlParams();

  constructor(private service:DashboardService) {
    
  }

  ngOnInit() {
    this.getProducts()
    this.getTypes()
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

  getTypes() {
    this.service.getTypes().subscribe({
      next: (_types: any) => {
        this.types = _types;
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
