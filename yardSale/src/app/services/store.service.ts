import { Injectable } from '@angular/core';

import {product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: product[] = [];

  constructor() { }

  addProduct (product: product) {
    this.myShoppingCart.push(product);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item)=> sum+item.price, 0 );
  }

}
