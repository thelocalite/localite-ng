import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {environment} from "../environments/environment";


// <FIRE MODULES>
import {AgmCoreModule} from "@agm/core";
import {AngularFireModule} from '@angular/fire';
export const firebaseConfig = environment.firebaseConfig;

// </FIRE MODULES>

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChangePasswordComponent } from "./components/auth/change-password/change-password.component";
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { LogoutComponent } from "./components/auth/logout/logout.component";
import { UsersComponent } from "./components/auth/users/users.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { HomeComponent } from "./components/layout/home/home.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { SearchComponent } from "./components/layout/search/search.component";
import { SliderComponent } from "./components/layout/slider/slider.component";
import { ProductCategoriesComponent } from "./components/store/products/product-categories/product-categories.component";
import { ProductDetailsComponent } from "./components/store/products/product-details/product-details.component";
import { ProductListComponent } from "./components/store/products/product-list/product-list.component";
import { ProductsComponent } from "./components/store/products/products.component";
import { ServiceListComponent } from "./components/store/services/service-list/service-list.component";
import { ServicesComponent } from "./components/store/services/services.component";
import { TechnicianDetailsComponent } from "./components/store/services/technician-details/technician-details.component";
import { CartComponent } from "./components/user/cart/cart.component";
import { LocationComponent } from "./components/user/location/location.component";
import { OrdersComponent } from "./components/user/orders/orders.component";
import { ServiceDetailsComponent } from "./components/store/services/service-details/service-details.component";
import { NotFoundComponent } from "./components/layout/not-found/not-found.component";

// Social Login
import { SocialLoginModule } from "angularx-social-login";
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";
import { AuthHttpInterceptorService } from "./services/auth/auth-http-interceptor.service";
import { AuthGaurdService } from "./services/auth/auth-gaurd.service";
import { ProductService } from "./services/product.service";
import { UserService } from "./services/user.service";
import { PrivacyComponent } from "./components/pages/privacy/privacy.component";
import { TermsComponent } from "./components/pages/terms/terms.component";
import { StoreCarouselComponent } from "./components/layout/store-carousel/store-carousel.component";
import { AddProductComponent } from './components/data/add-product/add-product.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AddStoreComponent } from './components/data/add-store/add-store.component';
import { StorePageComponent } from './components/store/stores/store-page/store-page.component';
import { StoresComponent } from './components/store/stores/stores.component';
import { ShopDetailsComponent } from './components/store/stores/shop-details/shop-details.component';
import { ImageUploaderComponent } from './components/utils/image-uploader/image-uploader.component';
import { ProductPageComponent } from './components/store/products/product-page/product-page.component';
import { SearchResultsComponent } from './components/store/products/search-results/search-results.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "200802725189-eg42ov83u9fch748jp5sfcg4gf29pl10.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2533623390096460")
  }
]);

export function provideConfig() {
  return config;
}

// Social Login Ends

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ChangePasswordComponent,
    UsersComponent,
    FooterComponent,
    LogoutComponent,
    CartComponent,
    LocationComponent,
    SearchComponent,
    SliderComponent,
    ForgotPasswordComponent,
    OrdersComponent,
    ProductsComponent,
    ServicesComponent,
    ShopDetailsComponent,
    ProductListComponent,
    ProductCategoriesComponent,
    ProductDetailsComponent,
    ServiceListComponent,
    TechnicianDetailsComponent,
    ServiceDetailsComponent,
    NotFoundComponent,
    PrivacyComponent,
    TermsComponent,
    StoreCarouselComponent,
    AddProductComponent,
    ProfileComponent,
    StorePageComponent,
    AddStoreComponent,
    StoresComponent,
    ImageUploaderComponent,
    ProductPageComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  providers: [
    ProductService,
    UserService,
    AuthGaurdService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
