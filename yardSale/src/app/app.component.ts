import { Component } from '@angular/core';

import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yardSale';
  imgParent= 'https://source.unsplash.com/random';
  token = '';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService
  ){}

  createUser(){
    this.UsersService.create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1212'
    }).subscribe(rta =>{
      console.log(rta);
    });
  }
}
