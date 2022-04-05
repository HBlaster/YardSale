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
  today = new Date();
  date = new Date(2022, 4, 4);
  showProductsDetail = false;
  productChosen: product = {
    id: '',
    title:'',
    images:[],
    price:0,
    description: '',
    category: {
      id: '',
      name: ''
    } 
  };

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

  toggleProductDetail(){
    this.showProductsDetail = !this.showProductsDetail;
  }

  onshowDetail (id: string){
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
  })
  }
}
