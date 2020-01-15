import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {LoginComponent} from './auth/login/login.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {UsersComponent} from './auth/users/users.component';
import {SearchComponent} from './components/search/search.component';
import {SliderComponent} from './components/slider/slider.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './layout/home/home.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {CartComponent} from './user/cart/cart.component';
import {LocationComponent} from './user/location/location.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, LoginComponent,
    ChangePasswordComponent, UsersComponent, FooterComponent, LogoutComponent,
    CartComponent, LocationComponent, SearchComponent, SliderComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
