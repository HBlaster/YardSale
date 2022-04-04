import { Component, OnInit } from '@angular/core';

import {product} from '../../models/product.model';

import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShopingCart: product[] = [];
  total = 0;

  products: product [] = [  ];

  constructor(

    private StoreServices: StoreService,
    private productsService: ProductsService

  ) {
    this.myShopingCart = this.StoreServices.getShoppingCart()

  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShopingCart(product: product){
    this.StoreServices.addProduct(product);
    this.total = this.StoreServices.getTotal();
  }
}
