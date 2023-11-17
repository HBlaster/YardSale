import { Component } from '@angular/core';

import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import {FilesService} from './services/files.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yardSale';
  imgParent= 'https://source.unsplash.com/random';
  token = '';
  imgRta = '';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService,
    private FileServices: FilesService
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

  downloadPdf(){
    this.FileServices.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.FileServices.uploadFile(file)
    .subscribe(rta =>{

      this.imgRta = rta.location;

    })
    }
    
  }

}
