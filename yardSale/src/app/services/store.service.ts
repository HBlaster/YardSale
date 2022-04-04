import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: product[] = [];
  private myCart = new BehaviorSubject<product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct (product: product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item)=> sum+item.price, 0 );
  }

}
