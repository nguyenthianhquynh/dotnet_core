import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService){}

  increaseProduct(item:IBasketItem){
    this.basketService.addItemToBasket(item)
  }

  decreaseProduct(item:IBasketItem){
    this.basketService.deleteItemFromBasket(item.id)
  }

  deleteProduct(item: IBasketItem){
    this.basketService.deleteItemFromBasket(item.id,item.quantity)
  }
}
