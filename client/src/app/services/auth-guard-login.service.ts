import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{

  constructor(  private userService : UserService,
                private router : Router) { }

  canActivate(){
    if(this.userService.isLoggedIn()){
      return false;
    }
    return true;
  }
}
