import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SHA256, enc } from "crypto-js";
import { UserService } from '../user.service';
import { GlobalDataService } from '../global-data.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { AlertService } from '../alert.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(private userService:UserService,private spinner: NgxSpinnerService,private alertService:AlertService,private global:GlobalDataService,private router:Router) { }

  form = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),

  });
  ngOnInit() {
  }

    register(){
      let username=this.form.get('username').value;
      let password=this.form.get('password').value;

      this.userService.createUseradmin({"adminId":username,"password":password}).subscribe(data=>{
        if(!data.action){
          this.spinner.hide();
          this.alertService.error(data.message);
        }
        else{
          let username=data.message.user.adminId;
          localStorage.setItem("user",JSON.stringify(data.message.user));
          localStorage.setItem("loggedInUsername",username);        
          localStorage.setItem("access_token",data.message.token);
          this.router.navigate(['/adminlogin/']);
          this.spinner.hide();
          this.alertService.success("you have been registered !!");
        }
      })
    }
}
