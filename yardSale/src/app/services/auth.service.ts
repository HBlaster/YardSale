import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private TokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.TokenService.saveToken(response.access_token))
    );
  }


  getProfile(){
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, 
    // {headers}
    {
      // headers:{
      //   Authorization: `Bearer ${token}`
      // }
      
    }
    );
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }
}
