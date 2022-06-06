import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { product, CreateProductDTO, UpdateproductDTO } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get<product[]>(this.apiUrl);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/${id}`);
  }

  create  (dto: CreateProductDTO){
    return this.http.post<product>(this.apiUrl, dto);
  }

  //put y patch para hacer actualizaciones en arreglos de datos
  //put se usa cuando quieres enviar la informacion de todo el arreglo
  //patch se usa cuando s va a cambiar unicamente uno o algunos valores del arreglo.
  update (id: string, dto: UpdateproductDTO){
    return this.http.put<product>(`${this.apiUrl}/${id}`, dto);
  }

  delete (id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
