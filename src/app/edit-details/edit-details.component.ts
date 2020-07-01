import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../alert.service';
import { GlobalDataService } from '../global-data.service';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';




@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  constructor(private userService:UserService,private spinner:NgxSpinnerService,private alertService:AlertService,private global:GlobalDataService,private router:Router) { }


  allowSignupPassword=false;
  allowSignupUsername=false;
  form = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    department : new FormControl('',Validators.required),
  });

  checkPassword()
  {
  
    let password=this.form.get('password').value;
    if(password.length==0)
    {
      this.allowSignupPassword=false;
      return;
    }
    const hashedPass = SHA256(password).toString(enc.Hex);
    let user= JSON.parse(localStorage.getItem("user"));
    if(hashedPass!=user.password)
    {
      this.alertService.error("Incorrect Password!");
      this.allowSignupPassword=false;
      return;
    }
    this.allowSignupPassword=true;

  }



  checkUsername(){
    let username=this.form.get('username').value;
    let loggedusername=localStorage.getItem("loggedInUsername");
    
    if(username==loggedusername)
    {
      this.alertService.error("Same username? Math karo yaar aise");
      this.allowSignupUsername=false;
      return;
    }
    username=username.trim();
    username=username.toLowerCase();
    if(username.length==0)return;
    let usernameLen=username.length;
    if(usernameLen<6)
    {
      this.alertService.error("We have enough space in our db! Please enter a username greater than 6 characters");
      this.allowSignupUsername=false;
      return;
    }
    if(usernameLen>20)
    {
      this.alertService.error("Having a long username won't give you higher marks. Please restrict to 20 characters");
      this.allowSignupUsername=false;      
      return;
    }
    for(let i=0;i<usernameLen;i++)
    {
      if(username[i]=='_')
      continue;
      if(username[i]>='a'&&username[i]<='z')
      {
        continue;
      }
      if(username[i]>='A'&&username[i]<='Z')
      {
        continue;
      }
      if(username[i]>='0'&&username[i]<='9')
      {
        continue;
      }
      this.alertService.error("Bahut tez ho rahe ho hain? Alphanumeric and underscores(_) only! :) ");
      this.allowSignupUsername=false;      
      return;
    }
    this.allowSignupUsername=true;
    this.userService.checkUser({"userId":username}).subscribe((data)=>{
        if(!data.action && username!=" "){
          this.allowSignupUsername=false;
          this.alertService.error(data.message); 
        }
        else{
          this.allowSignupUsername=true;
          if(username!=" "){
            this.alertService.info("Username available!");
          }
          
        }
      })
    
  }

  logout()
  {

    this.userService.logout();
  }

  editUsername(){
    this.spinner.show();
    this.checkPassword();
    this.checkUsername();
    if( !this.allowSignupPassword || !this.allowSignupUsername){
        this.spinner.hide();
        this.alertService.error("please enter valid values");
        return;
      }
    let newUsername=this.form.get('username').value;
    let username=localStorage.getItem("loggedInUsername")
    
    username=username.trim();
    username=username.toLowerCase();

    
      this.userService.updateUsername({"userId":username,"userIdNew":newUsername}).subscribe(data=>{
        if(!data.action)
        {
          this.spinner.hide();
          this.alertService.error(data.message);
        }
        else
        {
          this.spinner.hide();
          this.alertService.success(data.message)
          this.logout();
        }
        
      })
  
  }


  





  ngOnInit() {
  }

}
