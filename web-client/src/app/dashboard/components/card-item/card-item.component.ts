import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() product!: Product


  constructor(private basketService: BasketService) { 
  }

  addProductToBasket(){
    this.product && this.basketService.addItemToBasket(this.product,1)
  }

}
