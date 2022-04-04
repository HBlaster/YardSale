import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {product} from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: product = {
    id: '',
    title:'',
    image:'',
    price:0,
    description: '',
    category: ''

  }
  @Output() addedProduct = new EventEmitter<product>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);

  }

}
