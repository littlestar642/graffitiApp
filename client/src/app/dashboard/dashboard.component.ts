import { Component, OnInit } from '@angular/core';

// import { UserService } from  '../shared/user.service';
// import { User } from '';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {

  departments=["co","ec","ce","ch","ee"];
  constructor() { }

  ngOnInit() {
    // this.getUsers();
  }

  // getUsers()
  // {
  //   this.userService.getUsersList().subscribe((res)=>{
    
  //     this.userService.users=res as User[];
  //     console.log(this.userService.users);
  //   });
  //   // this.http.get(this.baseUrl)
  // }

}
