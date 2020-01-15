import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './layout/home/home.component';
import {CartComponent} from './user/cart/cart.component';
import {LocationComponent} from './user/location/location.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'location', component: LocationComponent},
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
