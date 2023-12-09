import { Injectable } from '@angular/core';
import { environment } from 'src/env/env.local';
import { Basket, BasketTotals, IBasket, IBasketItem } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl; 

  //create a observable to store the basket
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .subscribe({
        next: (data: IBasket) => {
          this.basketSource.next(data);
          this.getSummaryOrder()
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe({
        next: (data: IBasket) => {
          this.basketSource.next(data);
          this.getSummaryOrder()
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  deleteBasket(basket: IBasket){
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null)
        this.basketTotalSource.next(null)
        localStorage.removeItem("basket_id")
      }
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(product: Product | IBasketItem, quantity = 1){
    const basket = this.getCurrentBasketValue() ?? this.createNewBasket()

    //add BasketItem into Basket
    if (this.isProduct(product)) product = this.mapProductToBasketItem(product)
    basket.items = this.setBasketItems(basket.items, product, quantity)

    this.setBasket(basket)
  }
  isProduct(product: Product | IBasketItem): product is Product{
    return (product as Product).productBrand !== undefined
  }

  deleteItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue()
    if (basket)
    {
      const item = basket.items.find(x => x.id === id)
      if (item){
        item.quantity -= quantity
        if (item.quantity <= 0)
          basket.items = basket.items.filter(x => x.id !== id)

        if (basket.items.length > 0) {
          this.setBasket(basket)
        }
        else this.deleteBasket(basket)
      }
    }
  }

  getSummaryOrder(){
    const basket = this.getCurrentBasketValue()
    if (!basket) return

    const shippingPrice = 15
    const totalPrice = basket.items.reduce((prvvl, curVl) => prvvl + (curVl.quantity * curVl.price),0)
    const total = shippingPrice + totalPrice
    this.basketTotalSource.next({ shippingPrice, totalPrice, total })
  }

  //#region [helper]
  mapProductToBasketItem(product: Product): IBasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 0,
      pictureUrl: product.pictureUrl,
      brand: product.productBrand,
      type: product.productType
    }
  }

  createNewBasket(): IBasket {
    const nBasket = new Basket()
    localStorage.setItem("basket_id", nBasket.id)
    return nBasket
  }
  setBasketItems(items: IBasketItem[], item: IBasketItem, quantity: number): IBasketItem[] {
    //exist => update quantity
    //not exist => add new item
    const itemExist = items.find(i => i.id == item.id)

    if (itemExist) {
      item.quantity = itemExist.quantity
      item.quantity += quantity
      items = items.map(x =>
        x.id === item.id ? item : x
      )
    }
    else
      items.push(item)

    return items
  }
  //#endregion
}
