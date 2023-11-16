import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  // token = '';
  profile:User | null = null;

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter = products.length;
    });
  }


  toggleMenu (){
    this.activeMenu = !this.activeMenu;
  }

  // login() {
  //   this.AuthService.login('sebas@mail.com', '1212')
  //     .pipe(
  //       switchMap((rta) => {
  //         this.token = rta.access_token;
  //         console.log(this.token);
  //         return this.AuthService.getProfile(this.token);
  //       })
  //     )
  //     .subscribe((user) => {
  //       console.log(user);
  //       this.profile = user;
  //     });
  // }

  login(){
    this.AuthService.loginAndGet('sebas@mail.com', '1212')
    .subscribe(user =>{
      this.profile= user;
    });
  }


}
