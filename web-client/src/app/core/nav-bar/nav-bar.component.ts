import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Type } from 'src/app/models/type';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements  OnInit {
  logout() {
   this.authService.logout();
  }
  constructor(public basketService: BasketService, public authService: AuthService, public service: DashboardService){
  }
  ngOnInit(): void {
    this.getTypes()
  }

  getTheNumberOfProduct(items: IBasketItem[]){
    return items.reduce((num, item) => num + item.quantity,0)
  }

  getTypes() {
    this.service.getTypes();
  }
}
