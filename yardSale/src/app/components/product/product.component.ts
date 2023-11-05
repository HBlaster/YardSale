import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {product} from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  Image: string;

  @Input() product: product = {
    id: '',
    title:'',
    images:[],
    price:0,
    description: '',
    taxes:0,
    category: {
      id: '',
      name: ''
    }
  }
  @Output() addedProduct = new EventEmitter<product>();
  @Output() showProduct = new EventEmitter<string>();
  constructor() { 
    this.Image = "https://source.unsplash.com/1600x900/?portrait"; }

  ngOnInit(): void {
     
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);

  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
