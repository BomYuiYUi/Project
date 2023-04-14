import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './layout/user/user.component';
import { ProductComponent } from './page/product/product.component';
import { CartComponent } from './page/cart/cart.component';
import { NavbarshopComponent } from './navbar/navbarshop/navbarshop.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ProductdetailComponent } from './page/productdetail/productdetail.component';
import { ProfileComponent } from './page/profile/profile.component';
import { RegisterComponent } from './page/register/register.component';
import { SubuserComponent } from './layout/subuser/subuser.component';
import { NavbarsubuserComponent } from './navbar/navbarsubuser/navbarsubuser.component';
import { OrderComponent } from './page/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProductComponent,
    CartComponent,
    NavbarshopComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    ProductdetailComponent,
    ProfileComponent,
    RegisterComponent,
    SubuserComponent,
    NavbarsubuserComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
