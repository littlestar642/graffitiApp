<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardLoginService } from './services/auth-guard-login.service';

const routes: Routes = [
  {path:"homepage",component:HomepageComponent, canActivate:[AuthGuardLoginService]},
  {path:"edit/:userId/:editId",component:EditPageComponent,canActivate: [AuthGuardService]},
  {path:"signup",component:SignUpComponent, canActivate:[AuthGuardLoginService]},
  {path:"dashboard/:userId",component:DashboardComponent,canActivate: [AuthGuardService]},
  {path: '',   redirectTo: 'homepage', pathMatch: 'full'},
=======
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  HomepageComponent
} from './homepage/homepage.component';
import {
  EditPageComponent
} from './edit-page/edit-page.component';
import {
  SignUpComponent
} from './sign-up/sign-up.component';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  AuthGuardService
} from './services/auth-guard.service';
import {
  FrontComponent
} from './front/front.component';
import {
  BackComponent
} from './back/back.component';
import {
  AuthGuardLoginService
} from './services/auth-guard-login.service';
import {
  ProfileComponent
} from './profile/profile.component';
import { FrontProfileComponent } from './front-profile/front-profile.component';
import { BackProfileComponent } from './back-profile/back-profile.component';

const routes: Routes = [{
    path: "homepage",
    component: HomepageComponent,
    canActivate: [AuthGuardLoginService]
  },
  {
    path: "edit/:userId/:editId",
    component: EditPageComponent,
    children: [{
        path: 'front',
        component: FrontComponent
      },
      {
        path: 'back',
        component: BackComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: "signup",
    component: SignUpComponent,
    canActivate: [AuthGuardLoginService]
  },
  {
    path: "dashboard/:userId",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    children: [{
        path: 'front',
        component: FrontProfileComponent
      },
      {
        path: 'back',
        component: BackProfileComponent
      }
    ],
    canActivate: [AuthGuardService]
  }
>>>>>>> 3569b1716295bf1b70c28017fa266ff967bfb47c

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
