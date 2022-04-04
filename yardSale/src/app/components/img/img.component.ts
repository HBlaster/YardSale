import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  imgDefault = 'https://www.condesi.pe/blog/wp-content/uploads/2019/10/como-reparar-el-error-carga-error-al-escribir-el-archivo-en-el-disco-en-wordpress_5d9d8fb7c3951.jpeg';
  @Input() img: string ='valor init' ;
  constructor() { }

  ngOnInit(): void {
  }

  imgError(){
    this.img= this.imgDefault;
  }

}
