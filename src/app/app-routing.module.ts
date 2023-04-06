import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './layout/user/user.component';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { CartComponent } from './page/cart/cart.component';
import { LoginComponent } from './page/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ProductdetailComponent } from './page/productdetail/productdetail.component';
import { ProfileComponent } from './page/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[{
      path:'',
      component:HomeComponent
    }, 
    {
      path:'product',
      component:ProductComponent
    },
    {
      path:'cart',
      component:CartComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'products/:id',
      component:ProductdetailComponent
    },
    {
      path:'profile',
      component:ProfileComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
