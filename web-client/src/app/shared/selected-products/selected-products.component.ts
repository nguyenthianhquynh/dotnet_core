import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from '../models/basket';

@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.component.html',
  styleUrls: ['./selected-products.component.scss']
})
export class SelectedProductsComponent {
  @Output() deleteProductEmit = new EventEmitter<IBasketItem>();
  @Output() increaseProductEmit = new EventEmitter<IBasketItem>();
  @Output() decreaseProductEmit = new EventEmitter<IBasketItem>();
  @Input() isReadonly: boolean = false

  constructor(public basketService: BasketService) {

  }

  deleteProduct(item: IBasketItem) {
    this.deleteProductEmit.emit(item);
  }

  increaseProduct(item: IBasketItem) {
    this.increaseProductEmit.emit(item);
  }
  decreaseProduct(item: IBasketItem) {
    this.decreaseProductEmit.emit(item);
  }
}
