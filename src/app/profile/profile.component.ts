import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private user:UserService,private alert:AlertService,private activeRoute:ActivatedRoute) { }
  userArr;
  username;
  ngOnInit() {
    this.checkUrl();
    this.userArr=[];
    this.username=localStorage.getItem("loggedInUsername").toUpperCase();
    this.user.getWritingUsers().subscribe((ret:any)=>{
      if(!ret.action){
        this.alert.error(ret.message);
      }
      else{
        this.userArr=ret.message;
      }
    })
  }

  gotoEditDetails()
  {
  
    this.router.navigate(['editdetails'],{relativeTo:this.route});
  }

  checkUrl()
  {
    let urlUser=this.activeRoute.snapshot.url[1].path;
    let loggedInUsername=localStorage.getItem("loggedInUsername");
    if(urlUser!=loggedInUsername)
    {
      this.router.navigate(['/']);
    }
  }
  
  showHome(){
    let username=localStorage.getItem('loggedInUsername');
    this.router.navigate(['/dashboard/'+username])
  }
  
  
  showFront()
  {
    this.router.navigate(['front'],{relativeTo:this.route});
  }
  
  showBack()
  {
    this.router.navigate(['back'],{relativeTo:this.route});
  }

}
