import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { DashboardService } from '../../dashboard.service';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantityInBasket: number = 0;
  numberOfProducts:number = 1;
  numberOfInventory:number = 10;

  constructor(private activeRoute: ActivatedRoute, private productsService: DashboardService, private basketService: BasketService){

  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const productId = this.activeRoute.snapshot.paramMap.get('id')
    if (productId) this.productsService.getProductById(+productId).subscribe({
      next: data => {
        this.product = data;
        this.basketService.basket$.pipe(take(1)).subscribe({
          next: basket =>{
            const item = basket?.items.find(x=>x.id == +productId)
            if (item) this.quantityInBasket = item.quantity
          }
        })
      },
      error: error => console.log(error)
    })
  }

  minusProduct(){
    if(this.numberOfProducts > 1) this.numberOfProducts--;
  }

  plusProduct(){
    if(this.numberOfProducts < this.numberOfInventory) this.numberOfProducts++;
  }

  updateProductInBasket(product: Product){
    this.basketService.addItemToBasket(product, this.numberOfProducts)
    this.quantityInBasket += this.numberOfProducts
  }
}
