import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'shopping';
  isLogged = false;

  constructor(private basketService: BasketService, public authService: AuthService){
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  loadBasket(){
    const basket_id = localStorage.getItem("basket_id") ?? ""
    this.basketService.getBasket(basket_id);
  }

  loadUser(){
    const token = localStorage.getItem('token') ?? ""
    this.authService.getCurrentUser(token)?.subscribe();
  }
}
