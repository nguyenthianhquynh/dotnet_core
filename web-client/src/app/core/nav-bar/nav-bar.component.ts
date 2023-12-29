import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  logout() {
   this.authService.logout();
  }
  constructor(public basketService: BasketService, public authService: AuthService){
    
  }

  getTheNumberOfProduct(items: IBasketItem[]){
    return items.reduce((num, item) => num + item.quantity,0)
  }
}
