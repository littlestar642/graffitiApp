import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GlobalDataService } from '../global-data.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService,private global:GlobalDataService,private router:Router,private sanitizer: DomSanitizer) { }
  photo="";
  userArr:User[];
  currentUser:User;

  ngOnInit() {
    // this.userArr=[];
    this.getDepartmentUsers("COED");
    this.userService.getImageUrlForUser({"userId":localStorage.getItem("loggedInUsername")}).subscribe((data)=>{
      console.log("thu thu ");
      if(!data.action){
        console.log(data.message)
      }
      else{
        this.photo=data.message;
      }
    })
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  getDepartmentUsers(department:string)
  {
    

    this.userService.getDataForDashboard({"department":department}).subscribe((data)=>
    {
      if(!data.action)
      {
        this.userArr=[];
        console.log(data.message);
      }
      else{
        this.userArr=JSON.parse(data.message);
        console.log("this is department "+this.userArr[0].department);
      }
    })
  }


  

}
