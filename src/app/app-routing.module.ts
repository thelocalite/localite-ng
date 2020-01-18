import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {LoginComponent} from './components/auth/login/login.component';
import {LogoutComponent} from './components/auth/logout/logout.component';
import {HomeComponent} from './components/layout/home/home.component';
import {CartComponent} from './components/user/cart/cart.component';
import {LocationComponent} from './components/user/location/location.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'location', component: LocationComponent},
  // {path: 'forgot-password', component: ForgotPasswordComponent},
  {
    path: 'forgot-password',
    children: [
      {path: '', component: ForgotPasswordComponent},
      {path: '**', component: ForgotPasswordComponent},
    ]
  },


];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
