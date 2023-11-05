import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import { product, CreateProductDTO, UpdateproductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { environment } from './../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;
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
      retry(3),
      map(products => products.map(item=>{
        return{
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateproductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProductsByPage(limit: number, offset:number ){
    return this.http.get<product[]> (`${this.apiUrl}`, {
      params: {limit, offset}
    })
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 500){
          return throwError('Oops, something went wrong on the server');
        }
        if(error.status === 404){
          return throwError('Product not found');
        }
        return throwError('Oops, something went wrong');
      })
    )
    
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
