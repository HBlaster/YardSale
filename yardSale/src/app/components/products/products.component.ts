import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';

import {
  product,
  CreateProductDTO,
  UpdateproductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShopingCart: product[] = [];
  total = 0;
  products: product[] = [];
  today = new Date();
  date = new Date(2022, 4, 4);
  showProductsDetail = false;
  productChosen: product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
  };

  limit: number=10;
  offset: number = 0;

  statusDetail : 'loading' | 'success' | 'error' | 'init'= 'init';

  constructor(
    private StoreServices: StoreService,
    private productsService: ProductsService
  ) {
    this.myShopingCart = this.StoreServices.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0).subscribe((data) => {
      this.products = data;
    });
  }

 

  onAddToShopingCart(product: product) {
    this.StoreServices.addProduct(product);
    this.total = this.StoreServices.getTotal();
  }

  toggleProductDetail() {
    this.showProductsDetail = !this.showProductsDetail;
  }

  onshowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe((data) => {
      this.statusDetail = 'success'
      this.productChosen = data;
    }, errorMsg =>{
      window.alert(errorMsg);
      this.statusDetail = 'error';
    }
    );
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap(
        (product)=>this.productsService.update(product.id, {title: 'change'})
      )
    )
    .subscribe(data =>{
      console.log(data)
    });
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response =>{
      const read = response[0];
      const update = response[1]
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      categoryId: 2,
      title: 'Nuevo producto',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      description: 'this is a new product',
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateproductDTO = {
      title: 'change title',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
    });
  }

  deleteProduct (){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductsDetail = !this.showProductsDetail
    })
  }

  loadMore (){
    
    this.productsService.getAllProducts(this.limit, this.offset).subscribe((data) => {
      this.products= this.products.concat(data);
      this.offset+=this.limit;
    });

  }

}
