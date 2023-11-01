import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { product, CreateProductDTO, UpdateproductDTO } from '../models/product.model';
import { retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuappiiii.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?:number ){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      
    }
    return this.http.get<product[]>(this.apiUrl, {params})
      .pipe(
        retry(3)
      );
  }

  getProductsByPage(limit: number, offset:number ){
    return this.http.get<product[]> (`${this.apiUrl}`, {
      params: {limit, offset}
    })
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
