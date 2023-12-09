import { Component } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping';

  constructor(private basketService: BasketService){
    const basket_id = localStorage.getItem("basket_id") ?? ""
    this.basketService.getBasket(basket_id);
  }
}
