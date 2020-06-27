import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FrontComponent } from './front/front.component';
import { BackComponent } from './back/back.component';
//import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"homepage",component:HomepageComponent,},
  {path:"edit/:userId/:editId",component:EditPageComponent,
  children:[ {path : 'front', component:FrontComponent },
  {path: 'back',component:BackComponent}
  ],canActivate: [AuthGuardService]},
  {path:"signup",component:SignUpComponent},
  {path:"dashboard/:userId",component:DashboardComponent,canActivate: [AuthGuardService]},
  {path: '',   redirectTo: 'homepage', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  

 }
